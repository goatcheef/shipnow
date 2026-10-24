import UserModel from '../models/user.model.js'

// nunca devolvemos la password
const PROYECCION = '-password -__v'

class UserRepository {
  async getAll() {
    return await UserModel.find({ active: true }).select(PROYECCION).lean()
  }

  async getById(id) {
    return await UserModel.findOne({ _id: id, active: true }).select(PROYECCION).lean()
  }

  async getByEmail(email) {
    return await UserModel.findOne({ email }).select(PROYECCION).lean()
  }

  async create(data) {
    const nuevo = await UserModel.create(data)
    const user = nuevo.toObject()
    delete user.password
    delete user.__v
    return user
  }

  async update(id, data) {
    return await UserModel.findOneAndUpdate({ _id: id, active: true }, data, { new: true })
      .select(PROYECCION)
      .lean()
  }

  async delete(id) {
    return await UserModel.findOneAndUpdate({ _id: id, active: true }, { active: false }, { new: true })
      .select(PROYECCION)
      .lean()
  }
}

export default new UserRepository()
