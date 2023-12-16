const Plan = require('../../models/plan.model');


exports.crearPlan = async (plans) => {
  return await Plan.save(plans);
};

exports.buscarPlan = async () => {
  return await Plan.find();
};

exports.buscarunPlanPorId = async (id) => {
  return await Plan.findById(id );
};

exports.buscarunPlanId = async (id) => {
  return await Plan.findOne({ where: { id } });
};

exports.reemplazar = async (cedula, nuevoCliente) => {
  return await Plan.findOneAndReplace({ cedula }, nuevoCliente);
};


exports.actualizar = async (id, cambios ) => {
  return await Plan.findByIdAndUpdate(id, cambios, { new: true, runValidators: true })
};

exports.eliminar = async (id) => {
  return await Plan.deleteOne({ id });
};

exports.buscaryeliminar = async (id) => {
  return await Plan.findByIdAndDelete( id );
};