// constantes del dominio, congeladas para que nadie las modifique
export const ROLES = Object.freeze({
  ADMIN: 'ADMIN',
  USER: 'USER',
  REPARTIDOR: 'REPARTIDOR'
})

export const PRODUCT_STATUS = Object.freeze({
  AVAILABLE: 'AVAILABLE',
  OUT_OF_STOCK: 'OUT_OF_STOCK'
})

export const ORDER_STATUS = Object.freeze({
  PENDIENTE: 'PENDIENTE',
  EN_PREPARACION: 'EN_PREPARACION',
  ENVIADO: 'ENVIADO',
  ENTREGADO: 'ENTREGADO',
  CANCELADO: 'CANCELADO'
})

export const ORDER_PRIORITY = Object.freeze({
  BAJA: 'BAJA',
  NORMAL: 'NORMAL',
  ALTA: 'ALTA',
  URGENTE: 'URGENTE'
})

export const DELIVERY_STATUS = Object.freeze({
  SIN_ASIGNAR: 'SIN_ASIGNAR',
  ASIGNADA: 'ASIGNADA',
  EN_CAMINO: 'EN_CAMINO',
  ENTREGADA: 'ENTREGADA',
  FALLIDA: 'FALLIDA'
})
