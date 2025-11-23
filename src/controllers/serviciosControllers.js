// RUTA CORREGIDA: Sube un nivel (..) y entra en 'models'
const Servicio = require('../models/modelServicios'); 

// Crear un nuevo servicio
/* Descripción:
   Recibe los datos del nuevo servicio en el body de la petición.
   Crea una nueva instancia del modelo Servicio y la guarda en la base de datos.
   Devuelve el servicio creado con código 201 (Created) si es exitoso.
*/
exports.create = async (req, res) => {
    try {
        const nuevoServicio = new Servicio(req.body);
        await nuevoServicio.save();
        // 201 Created: Respuesta estándar para una creación exitosa
        res.status(201).json(nuevoServicio); 
    } catch (error) {
        // Manejar errores de validación (400 Bad Request) o de servidor (500)
        res.status(400).json({ 
            message: 'Error al crear el servicio. Revise los datos e intente nuevamente.', 
            error: error.message 
        });
    }
};

// Obtener todos los servicios
exports.getAll = async (req, res) => {
  try {
    // Buscar todos los servicios en la base de datos
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los servicios', error: error.message });
  } 
};

// Obtener un servicio por id
exports.getOne = async (req, res) => {
  try { 
    const { id } = req.params;
    // Buscar el servicio por ID
    const servicio = await Servicio.findById(id);
    if (!servicio) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(servicio);
  }
    catch (error) {
    // Si el ID no tiene el formato correcto (ej. no es un ObjectId válido), entra aquí
    res.status(500).json({ message: 'Error al obtener el servicio', error: error.message });
  }
};

// Actualizar un servicio por id
exports.update = async (req, res) => {
  try {
    const { id } = req.params; 
    const nuevosDatos = req.body;
    // new: true devuelve el documento actualizado
    const servicioActualizado = await Servicio.findByIdAndUpdate(id, nuevosDatos, { 
        new: true, 
        runValidators: true // Ejecuta validaciones del esquema al actualizar
    }); 
    
    if (!servicioActualizado) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(servicioActualizado);
  } catch (error) {
    // Manejar error de validación (ej. nombre ya existe)
    res.status(400).json({ message: 'Error al actualizar el servicio', error: error.message });
  }
};

// Eliminar un servicio por id
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const servicioEliminado = await Servicio.findByIdAndDelete(id);
    if (!servicioEliminado) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el servicio', error: error.message });
  }
}