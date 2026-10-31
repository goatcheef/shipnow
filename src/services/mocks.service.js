import { fakerES as faker } from '@faker-js/faker'
import userRepository from '../repositories/user.repository.js'
import orderRepository from '../repositories/order.repository.js'
import deliveryRepository from '../repositories/delivery.repository.js'
import { ROLES, ORDER_STATUS } from '../constants/index.js'
import { generarUsuario, generarPedido, generarEntrega, idFalso } from '../utils/mocking.js'

const MAX_QTY = 100

class MocksService {
  validarQty(qty) {
    const n = Number(qty) || 10
    if (n < 1 || n > MAX_QTY) throw new Error(`qty tiene que estar entre 1 y ${MAX_QTY}`)
    return n
  }

  // ---------- solo generar (no guarda nada) ----------

  getUsers(qty) {
    const n = this.validarQty(qty)
    const users = []
    for (let i = 0; i < n; i++) {
      // la mayoria clientes, algunos repartidores
      const role = faker.helpers.arrayElement([ROLES.USER, ROLES.USER, ROLES.REPARTIDOR])
      users.push(generarUsuario(role))
    }
    return users
  }

  getRepartidores(qty) {
    const n = this.validarQty(qty)
    const repartidores = []
    for (let i = 0; i < n; i++) repartidores.push(generarUsuario(ROLES.REPARTIDOR))
    return repartidores
  }

  getOrders(qty) {
    const n = this.validarQty(qty)
    const orders = []
    for (let i = 0; i < n; i++) {
      const order = generarPedido(idFalso())
      order._id = idFalso()
      orders.push(order)
    }
    return orders
  }

  getDeliveries(qty) {
    // generamos pedidos y les armamos la entrega
    const orders = this.getOrders(qty)
    return orders.map((order) => {
      const tieneRepartidor = order.status !== ORDER_STATUS.PENDIENTE
      return generarEntrega(order, tieneRepartidor ? idFalso() : null)
    })
  }

  // ---------- generar e insertar en mongo ----------

  async seed(coleccion, qty) {
    const n = this.validarQty(qty)

    switch (coleccion) {
      case 'usuarios':
        return { insertados: await userRepository.insertMany(this.getUsers(n)), coleccion }

      case 'repartidores':
        return { insertados: await userRepository.insertMany(this.getRepartidores(n)), coleccion }

      case 'pedidos': {
        // los pedidos tienen que ser de usuarios que existan
        const clientes = await userRepository.getByRole(ROLES.USER)
        if (clientes.length === 0) throw new Error('Primero cargá usuarios (coleccion=usuarios)')

        const pedidos = []
        for (let i = 0; i < n; i++) {
          const cliente = faker.helpers.arrayElement(clientes)
          pedidos.push(generarPedido(cliente._id))
        }
        return { insertados: await orderRepository.insertMany(pedidos), coleccion }
      }

      case 'entregas': {
        const pedidos = await orderRepository.getIds()
        const repartidores = await userRepository.getByRole(ROLES.REPARTIDOR)
        if (pedidos.length === 0) throw new Error('Primero cargá pedidos (coleccion=pedidos)')

        const entregas = faker.helpers.arrayElements(pedidos, Math.min(n, pedidos.length)).map((pedido) => {
          // si esta pendiente o no hay repartidores queda sin asignar
          let repartidorId = null
          if (pedido.status !== ORDER_STATUS.PENDIENTE && repartidores.length > 0) {
            repartidorId = faker.helpers.arrayElement(repartidores)._id
          }
          return generarEntrega(pedido, repartidorId)
        })
        return { insertados: await deliveryRepository.insertMany(entregas), coleccion }
      }

      default:
        throw new Error('coleccion invalida. Opciones: usuarios, repartidores, pedidos, entregas')
    }
  }
}

export default new MocksService()
