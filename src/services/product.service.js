import productRepository from '../repositories/product.repository.js'
import { PRODUCT_STATUS } from '../constants/index.js'

class ProductService {
  async getAll() {
    const productos = await productRepository.getAll()
    // regla de negocio: solo mostramos los que tienen stock
    return productos.filter((p) => p.stock > 0)
  }

  async getById(id) {
    const producto = await productRepository.getById(id)
    if (!producto) throw new Error('Producto no encontrado')
    return producto
  }

  async create(data) {
    if (!data.title || data.price === undefined) {
      throw new Error('Faltan datos obligatorios (title, price)')
    }
    if (data.price < 0) throw new Error('El precio no puede ser negativo')

    data.status = this.calcularEstado(data.stock)
    return await productRepository.create(data)
  }

  async update(id, data) {
    // el estado depende del stock, si lo actualizan lo recalculamos
    if (data.stock !== undefined) {
      data.status = this.calcularEstado(data.stock)
    }
    const actualizado = await productRepository.update(id, data)
    if (!actualizado) throw new Error('Producto no encontrado')
    return actualizado
  }

  async delete(id) {
    const borrado = await productRepository.delete(id)
    if (!borrado) throw new Error('Producto no encontrado')
    return borrado
  }

  calcularEstado(stock) {
    return stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK
  }
}

export default new ProductService()
