# ShipNow

API de ShipNow separada en capas (controller, service y repository) para el curso de Backend 3.

## Como correrlo

1. Clonar el repo y entrar a la carpeta
2. Instalar todo con `npm install`
3. Crear un archivo `.env` copiando el `.env.example` y completarlo, por ejemplo:
```
PORT=8080
MONGODB_URI=mongodb://localhost:27017/shipnow
NODE_ENV=development
```
4. Correr `npm run dev`

Si falta alguna variable en el .env la app no arranca y te avisa cual falta.

## Rutas

- `/api/products` → get, get por id, post, put y delete
- `/api/users` → lo mismo

## Por que separe asi el service y el repository

En el repository deje solo lo que tiene que ver con Mongo: buscar, guardar, actualizar. Ahi tambien puse que traiga solo los que estan activos (porque el delete no borra, los marca como inactivos) y que nunca devuelva la contraseña de los usuarios.

En el service puse las reglas del negocio, por ejemplo que no se muestren productos sin stock, que el estado del producto cambie segun el stock, que no se repitan mails y que no se pueda borrar un admin.

Asi si cambia alguna regla solo toco el service, y el controller no sabe nada de la base de datos, solo recibe el pedido y responde.

## Mocks (pre entrega 2)

Agregue un router en `/api/mocks` para generar datos de prueba con faker. Los datos usan las constantes de roles, estados y prioridades, asi que siempre salen con valores validos.

### Ver datos falsos (no se guardan en la base)

- `GET /api/mocks/users?qty=5` → usuarios (clientes y algunos repartidores)
- `GET /api/mocks/repartidores?qty=5` → solo repartidores
- `GET /api/mocks/orders?qty=5` → pedidos con items, total, estado y prioridad
- `GET /api/mocks/deliveries?qty=5` → entregas, cada una con su pedido y repartidor si corresponde

Si no mandas `qty` genera 10. El maximo es 100.

### Cargar datos en Mongo

`POST /api/mocks/seed?coleccion=usuarios&qty=10`

Responde algo asi:
```
{ "insertados": 10, "coleccion": "usuarios" }
```

Opciones de `coleccion`: `usuarios`, `repartidores`, `pedidos`, `entregas`.

Hay que cargarlos en orden porque estan relacionados:
1. `usuarios` y `repartidores`
2. `pedidos` (se le asigna a cada pedido un usuario que ya exista)
3. `entregas` (se crean sobre pedidos que ya existan y se les asigna un repartidor, menos a los pendientes que quedan sin asignar)

Si intentas cargar pedidos sin tener usuarios, o entregas sin pedidos, te tira un error avisando.

### Donde quedo cada cosa

- `routes/mocks.router.js` → solo las rutas
- `controllers/mocks.controller.js` → recibe el pedido y responde
- `services/mocks.service.js` → arma los datos y maneja las relaciones
- `utils/mocking.js` → las funciones de faker que arman cada objeto
- `repositories/` → el `insertMany` y las busquedas que necesita el seed
