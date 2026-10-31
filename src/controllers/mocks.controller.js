import mocksService from '../services/mocks.service.js'

class MocksController {
  getUsers(req, res) {
    try {
      res.status(200).json(mocksService.getUsers(req.query.qty))
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }

  getRepartidores(req, res) {
    try {
      res.status(200).json(mocksService.getRepartidores(req.query.qty))
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }

  getOrders(req, res) {
    try {
      res.status(200).json(mocksService.getOrders(req.query.qty))
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }

  getDeliveries(req, res) {
    try {
      res.status(200).json(mocksService.getDeliveries(req.query.qty))
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }

  async seed(req, res) {
    try {
      const coleccion = req.query.coleccion || 'usuarios'
      const resultado = await mocksService.seed(coleccion, req.query.qty)
      res.status(201).json(resultado)
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }
}

export default new MocksController()
