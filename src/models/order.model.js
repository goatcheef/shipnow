import mongoose from 'mongoose'
import { ORDER_STATUS, ORDER_PRIORITY } from '../constants/index.js'

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDIENTE
    },
    priority: {
      type: String,
      enum: Object.values(ORDER_PRIORITY),
      default: ORDER_PRIORITY.NORMAL
    }
  },
  { timestamps: true }
)

const OrderModel = mongoose.model('Order', orderSchema)

export default OrderModel
