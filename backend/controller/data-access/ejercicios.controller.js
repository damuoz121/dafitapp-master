// Importamos el modelo de ejercicio
const Ejercicio = require('../../models/ejercicios.model');

exports.crearEjercicios = async (ejercicios) => {
  return await Ejercicio.save(ejercicios);
};

exports.buscarEjercicios = async () => {
  return await Ejercicio.find();
};

exports.buscarunEjercicioPorId = async (id) => {
  return await Ejercicio.findById(id );
};

exports.buscarunEjercicioId = async (id) => {
  return await Ejercicio.findOne({ where: { id } });
};

exports.reemplazar = async (cedula, nuevoCliente) => {
  return await Ejercicio.findOneAndReplace({ cedula }, nuevoCliente);
};


exports.actualizar = async (id, cambios ) => {
  return await Ejercicio.findByIdAndUpdate(id, cambios, { new: true, runValidators: true })
};

exports.eliminar = async (id) => {
  return await Ejercicio.deleteOne({ id });
};

exports.buscaryeliminar = async (id) => {
  return await Ejercicio.findByIdAndDelete( id );
};