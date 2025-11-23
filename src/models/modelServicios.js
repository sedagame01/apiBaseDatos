const mongoose = require('mongoose');

/*  se define el esquema para los servicios
    nombre: string, requerido, unico
    descripcion: string, requerido
    precio: number, requerido
    disponible: boolean, por defecto true
 */
const ServicioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del servicio es obligatorio.'],
        unique: true,
        trim: true // Elimina espacios en blanco al inicio y final
    },
    descripcion: { 
        type: String,
        required: [true, 'La descripción es obligatoria.']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio.'],
        min: [0, 'El precio debe ser un número positivo.']
    },
    disponible: {
        type: Boolean, 
        default: true
    }
}, { timestamps: true }); // Agrega campos createdAt y updatedAt automáticamente

// exportamos el modelo para usarlo en el controlador
module.exports = mongoose.model('Servicio', ServicioSchema);