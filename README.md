# Express TypeScript App

npm install

npm run build (Si hay cambios)
npm run start

# Register y Login se usuarios con criptografía asimétrica

Cargas claves pública y privada y contraseña

## Test

npm run test

## Rutas

| URL path  | Método | Permisos | Descripción                                                                        |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------- |
| /register | POST   | open     | Mandas un usuario nuevo y una contraseña y te devuelve un token                    |
| /login    | POST   | open     | Mandas un usuario y una contraseña de un usuario registrado y te devuelve un token |

## Docker

docker compose up --build

En el 3015 el server y en el 3315 la bd
En el compose los datos del .env o podría coger los datos del .env directamente
