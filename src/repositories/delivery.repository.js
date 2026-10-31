import DeliveryModel from '../models/delivery.model.js'

class DeliveryRepository {
  async getAll() {
    return await DeliveryModel.find()
      .populate('order', 'status priority total')
      .populate('repartidor', 'first_name last_name email')
      .select('-__v')
      .lean()
  }

  async insertMany(deliveries) {
    const insertados = await DeliveryModel.insertMany(deliveries)
    return insertados.length
  }
}

export default new DeliveryRepository()
