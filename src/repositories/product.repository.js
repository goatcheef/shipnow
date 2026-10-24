import ProductModel from '../models/product.model.js'

// campos que no queremos devolver nunca
const PROYECCION = '-__v'

class ProductRepository {
  async getAll() {
    // por defecto solo traemos los activos (los borrados quedan con active: false)
    return await ProductModel.find({ active: true }).select(PROYECCION).lean()
  }

  async getById(id) {
    return await ProductModel.findOne({ _id: id, active: true }).select(PROYECCION).lean()
  }

  async create(data) {
    const nuevo = await ProductModel.create(data)
    return nuevo.toObject()
  }

  async update(id, data) {
    return await ProductModel.findOneAndUpdate({ _id: id, active: true }, data, { new: true })
      .select(PROYECCION)
      .lean()
  }

  async delete(id) {
    // borrado logico
    return await ProductModel.findOneAndUpdate({ _id: id, active: true }, { active: false }, { new: true }).lean()
  }
}

export default new ProductRepository()
