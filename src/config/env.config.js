import dotenv from 'dotenv'

dotenv.config()

// variables que si o si tienen que estar para que la app arranque
const requeridas = ['PORT', 'MONGODB_URI', 'NODE_ENV']

const faltantes = requeridas.filter((v) => !process.env[v])

if (faltantes.length > 0) {
  throw new Error(
    `Faltan variables de entorno obligatorias: ${faltantes.join(', ')}. Revisá tu archivo .env (podés guiarte con .env.example)`
  )
}

const config = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV
}

export default config
