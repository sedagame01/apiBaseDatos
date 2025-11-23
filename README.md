# API Personal - Servicios

API RESTful construida con **Node.js**, **Express** y **MongoDB** para manejar servicios (crear, leer, actualizar y eliminar).

---

## Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- CORS
- dotenv

---

## Instalación

instalacion de dependencias
npm install

## varibles de entonro
MONGODB_URI=mongodb+srv://usuario:password@cluster0.mongodb.net/servicios?retryWrites=true&w=majority&appName=Cluster0
PORT=3000

## datos clave
estructura {
  "nombre": String,
  "descripcion": String,
  "precio": num,
  "disponible": boolean
}

endpoint = /api/servicios

