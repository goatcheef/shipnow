import mongoose from 'mongoose'
import { ROLES } from '../constants/index.js'

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER
    },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
)

const UserModel = mongoose.model('User', userSchema)

export default UserModel
