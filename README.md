# ShipNow - Pre entrega 1

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
