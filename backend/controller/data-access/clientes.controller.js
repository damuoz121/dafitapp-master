const Cliente=require('../../models/clientes.model');

exports.crearCliente = async (rol, cedula, nombre, apellido, fechadenacimiento, email, password, telefono) => {
  const nuevoCliente = new Cliente({rol, cedula, nombre, apellido, fechadenacimiento, email, password, telefono });
  return await nuevoCliente.save();
};


exports.crearClientes = async (clientes) => {
  return await Cliente.save(clientes);
};

exports.buscarClientes = async () => {
  return await Cliente.find();
};

exports.buscarunClientePorId = async (id) => {
  return await Cliente.findById(id );
};

exports.buscarunClienteId = async (id) => {
  return await Cliente.findOne({ where: { id } });
};

exports.buscarAdmin = async (email) => {
  return await Cliente.findOne({email:email});
};

exports.buscarunClienteEmail = async (email) => {
  return await Cliente.findOne({ where: { email } });
};


exports.reemplazar = async (cedula, nuevoCliente) => {
  return await Cliente.findOneAndReplace({ cedula }, nuevoCliente);
};


exports.actualizar = async (id, cambios ) => {
  return await Cliente.findByIdAndUpdate(id, cambios, { new: true, runValidators: true })
};



exports.eliminar = async (cedula) => {
  return await Cliente.deleteOne({ cedula });
};

exports.buscaryeliminar = async (id) => {
  return await Cliente.findByIdAndDelete( id );
};