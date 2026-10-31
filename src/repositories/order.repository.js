import OrderModel from '../models/order.model.js'

class OrderRepository {
  async getAll() {
    return await OrderModel.find().select('-__v').lean()
  }

  async getIds() {
    // para los mocks solo necesitamos el id y el estado
    return await OrderModel.find().select('_id status').lean()
  }

  async insertMany(orders) {
    const insertados = await OrderModel.insertMany(orders)
    return insertados.length
  }
}

export default new OrderRepository()
