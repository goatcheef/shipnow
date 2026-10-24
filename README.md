# ShipNow API - Pre-entrega Módulo 1

API de ShipNow refactorizada a una arquitectura por capas (Controller → Service → Repository) con configuración de entorno validada.

## Cómo correrlo

1. Clonar el repo
   ```
   git clone https://github.com/goatcheef/shipnow.git
   cd shipnow
   ```
2. Instalar dependencias
   ```
   npm install
   ```
3. Crear un archivo `.env` en la raíz copiando `.env.example` y completar los valores:
   ```
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/shipnow
   NODE_ENV=development
   ```
4. Levantar el servidor
   ```
   npm run dev
   ```

Si falta alguna de las variables la app no arranca y muestra cuál falta.

## Estructura

```
src/
├── app.js
├── config/         -> env.config.js (dotenv + validación) y db.config.js
├── constants/      -> roles y estados de producto (Object.freeze)
├── models/         -> esquemas de Mongoose
├── repositories/   -> único lugar que usa Mongoose
├── services/       -> lógica de negocio
├── controllers/    -> manejan req y res
└── routes/         -> solo conectan path con controller
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/products | Lista productos con stock |
| GET | /api/products/:pid | Producto por id |
| POST | /api/products | Crea producto |
| PUT | /api/products/:pid | Actualiza producto |
| DELETE | /api/products/:pid | Borrado lógico |
| GET | /api/users | Lista usuarios |
| GET | /api/users/:uid | Usuario por id |
| POST | /api/users | Crea usuario |
| PUT | /api/users/:uid | Actualiza usuario |
| DELETE | /api/users/:uid | Borrado lógico |

## ¿Por qué separé así Service y Repository?

La idea que seguí es que el **Repository solo sabe buscar y guardar** datos. Por eso ahí quedaron cosas como traer solo los registros con `active: true` (porque el borrado es lógico) y la proyección para no devolver nunca el `__v` ni la password de los usuarios. Eso es parte de *cómo* se accede a los datos, no una regla del negocio.

En cambio, en el **Service** puse las decisiones: que no se muestren los productos sin stock, que el estado (`AVAILABLE` / `OUT_OF_STOCK`) se calcule según el stock, que no se pueda repetir un email o que no se pueda borrar un usuario ADMIN. Si mañana cambia alguna de estas reglas, se toca solo el service y el repository queda igual.

Así el controller no sabe nada de Mongo, solo recibe el request, llama al service y responde con el status que corresponde.
