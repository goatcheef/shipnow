import { Router } from 'express'
import mocksController from '../controllers/mocks.controller.js'

const router = Router()

router.get('/users', mocksController.getUsers)
router.get('/repartidores', mocksController.getRepartidores)
router.get('/orders', mocksController.getOrders)
router.get('/deliveries', mocksController.getDeliveries)
router.post('/seed', mocksController.seed)

export default router
