import mongoose from 'mongoose'
import { DELIVERY_STATUS } from '../constants/index.js'

const deliverySchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    // puede no tener repartidor si todavia no se asigno
    repartidor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    status: {
      type: String,
      enum: Object.values(DELIVERY_STATUS),
      default: DELIVERY_STATUS.SIN_ASIGNAR
    },
    estimatedDate: { type: Date },
    deliveredAt: { type: Date, default: null }
  },
  { timestamps: true }
)

const DeliveryModel = mongoose.model('Delivery', deliverySchema)

export default DeliveryModel
