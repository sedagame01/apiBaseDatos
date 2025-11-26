require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// RUTA CORREGIDA: rutas relativas al archivo app.js dentro de src/
const serviciosRoutes = require('./routes/serviciosRoutes');

// 1. Crear la aplicación de express
const app = express();


// 2. Configurar los middlewares (son funciones que se ejecutan antes de llegar a las rutas)
app.use(cors()); 
app.use(express.json());
//app.use(express.static('public'));

// 3. Definir las rutas para la API
app.use('/api/servicios',((req,res,next)=>{
  next()
} ),serviciosRoutes);

//nueva api para la codificacion
app.use('/api/outh',require('./routes/userRoutes'))

// 4. Conexión a la base de datos y arranque del servidor
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then((res) => {
    console.log(' Conectado a la base de datos antes de iniciar el servidor');
  
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos', error);
  });
app.listen(PORT, () => {
      console.log(` Servidor escuchando en el puerto ${PORT}`);
    });

