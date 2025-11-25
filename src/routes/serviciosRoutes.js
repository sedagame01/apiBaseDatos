const express = require('express');
const router = express.Router();


// RUTA CORREGIDA: Sube un nivel (..) y entra en 'controllers'
const serviciosControllers = require('../controllers/serviciosControllers'); 

// Definimos las rutas y asignamos los metodos del controlador a cada ruta
router.post('/', serviciosControllers.create); // Crear un nuevo servicio
router.get('/', serviciosControllers.getAll); // Obtener todos los servicios
router.get('/:id', serviciosControllers.getOne); // Obtener un servicio por ID
router.put('/:id', serviciosControllers.update); // Actualizar un servicio por ID
router.delete('/:id', serviciosControllers.delete); // Eliminar un servicio por ID


module.exports = router;