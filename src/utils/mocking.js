import { fakerES as faker } from '@faker-js/faker'
import { ROLES, ORDER_STATUS, ORDER_PRIORITY, DELIVERY_STATUS } from '../constants/index.js'

// funciones que solo arman objetos falsos, no tocan la base

export const generarUsuario = (role = ROLES.USER) => {
  const first_name = faker.person.firstName()
  const last_name = faker.person.lastName()
  return {
    first_name,
    last_name,
    email: faker.internet.email({ firstName: first_name, lastName: last_name, provider: 'test.com' }).toLowerCase(),
    password: 'coder123',
    role
  }
}

export const generarPedido = (userId) => {
  const items = []
  const cantItems = faker.number.int({ min: 1, max: 4 })

  for (let i = 0; i < cantItems; i++) {
    items.push({
      title: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 5 }),
      price: faker.number.int({ min: 500, max: 20000 })
    })
  }

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return {
    user: userId,
    items,
    total,
    address: faker.location.streetAddress(),
    status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
    priority: faker.helpers.arrayElement(Object.values(ORDER_PRIORITY))
  }
}

// el estado de la entrega depende del pedido y de si tiene repartidor
export const generarEntrega = (order, repartidorId) => {
  let status = DELIVERY_STATUS.SIN_ASIGNAR
  let deliveredAt = null

  if (repartidorId) {
    if (order.status === ORDER_STATUS.ENTREGADO) {
      status = DELIVERY_STATUS.ENTREGADA
      deliveredAt = faker.date.recent({ days: 10 })
    } else if (order.status === ORDER_STATUS.ENVIADO) {
      status = DELIVERY_STATUS.EN_CAMINO
    } else if (order.status === ORDER_STATUS.CANCELADO) {
      status = DELIVERY_STATUS.FALLIDA
    } else {
      status = DELIVERY_STATUS.ASIGNADA
    }
  }

  return {
    order: order._id,
    repartidor: repartidorId || null,
    status,
    estimatedDate: faker.date.soon({ days: 7 }),
    deliveredAt
  }
}

export const idFalso = () => faker.database.mongodbObjectId()
