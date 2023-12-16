const mongoose = require('../config/database');
const planSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del plan es obligatorio'],
        unique:[true, 'este plan ya se encuentra registrado'],
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [50, 'El nombre no puede tener más de 50 caracteres']
    },
    frecuencia: {
        type: String,
        required: [true, 'La frecuencia del plan es obligatoria'],
    },
    dificultad: {
        type: String,
        required: [true, 'La dificultad del plan es obligatoria'],
    },
    objetivo: {
        type: String,
        required: [true, 'El objetivo del plan es obligatorio']
    },
    ejercicios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ejercicio'
    }]
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;