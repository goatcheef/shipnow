import express from 'express'
import config from './config/env.config.js'
import { connectDB } from './config/db.config.js'
import productsRouter from './routes/products.router.js'
import usersRouter from './routes/users.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)

connectDB()

app.listen(config.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port} (${config.nodeEnv})`)
})
