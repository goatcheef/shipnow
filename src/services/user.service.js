import userRepository from '../repositories/user.repository.js'
import { ROLES } from '../constants/index.js'

class UserService {
  async getAll() {
    return await userRepository.getAll()
  }

  async getById(id) {
    const user = await userRepository.getById(id)
    if (!user) throw new Error('Usuario no encontrado')
    return user
  }

  async create(data) {
    const { first_name, last_name, email, password } = data
    if (!first_name || !last_name || !email || !password) {
      throw new Error('Faltan datos obligatorios')
    }

    const existe = await userRepository.getByEmail(email)
    if (existe) throw new Error('Ya existe un usuario con ese email')

    // si mandan un rol que no existe lo dejamos como USER
    if (!Object.values(ROLES).includes(data.role)) {
      data.role = ROLES.USER
    }

    // TODO: hashear la password (lo vemos en el modulo que viene)
    return await userRepository.create(data)
  }

  async update(id, data) {
    if (data.role && !Object.values(ROLES).includes(data.role)) {
      throw new Error('Rol invalido')
    }
    const actualizado = await userRepository.update(id, data)
    if (!actualizado) throw new Error('Usuario no encontrado')
    return actualizado
  }

  async delete(id) {
    const user = await userRepository.getById(id)
    if (!user) throw new Error('Usuario no encontrado')
    if (user.role === ROLES.ADMIN) throw new Error('No se puede eliminar un administrador')
    return await userRepository.delete(id)
  }
}

export default new UserService()
