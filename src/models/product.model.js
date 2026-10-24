import mongoose from 'mongoose'
import { PRODUCT_STATUS } from '../constants/index.js'

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.AVAILABLE
    },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
)

const ProductModel = mongoose.model('Product', productSchema)

export default ProductModel
