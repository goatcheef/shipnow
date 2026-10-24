import userService from '../services/user.service.js'

class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getAll()
      res.status(200).json({ status: 'success', payload: users })
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
    }
  }

  async getById(req, res) {
    try {
      const user = await userService.getById(req.params.uid)
      res.status(200).json({ status: 'success', payload: user })
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message })
    }
  }

  async create(req, res) {
    try {
      const user = await userService.create(req.body)
      res.status(201).json({ status: 'success', payload: user })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }

  async update(req, res) {
    try {
      const user = await userService.update(req.params.uid, req.body)
      res.status(200).json({ status: 'success', payload: user })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }

  async delete(req, res) {
    try {
      await userService.delete(req.params.uid)
      res.status(200).json({ status: 'success', message: 'Usuario eliminado' })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export default new UserController()
