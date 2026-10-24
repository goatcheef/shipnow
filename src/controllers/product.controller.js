import productService from '../services/product.service.js'

class ProductController {
  async getAll(req, res) {
    try {
      const productos = await productService.getAll()
      res.status(200).json({ status: 'success', payload: productos })
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
    }
  }

  async getById(req, res) {
    try {
      const producto = await productService.getById(req.params.pid)
      res.status(200).json({ status: 'success', payload: producto })
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message })
    }
  }

  async create(req, res) {
    try {
      const producto = await productService.create(req.body)
      res.status(201).json({ status: 'success', payload: producto })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }

  async update(req, res) {
    try {
      const producto = await productService.update(req.params.pid, req.body)
      res.status(200).json({ status: 'success', payload: producto })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  }

  async delete(req, res) {
    try {
      await productService.delete(req.params.pid)
      res.status(200).json({ status: 'success', message: 'Producto eliminado' })
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message })
    }
  }
}

export default new ProductController()
