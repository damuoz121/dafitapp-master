const clienteDataAccess = require('../data-access/clientes.controller');
const clientes= require('../../models/clientes.model');
// Creamos un caso de uso para crear un nuevo cliente
exports.crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new clientes({
        rol:req.body.rol,
        cedula:req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechadenacimiento: req.body.fechadenacimiento,
        email: req.body.email,
        password:req.body.password,
        telefono:req.body.telefono,
        planActivo:null,
        imgUser: "/img/default.png"
    });

    await nuevoCliente.save();
    // retorno que la operacion fue exitosa y le paso un json u objeto con el estado ok:true pa saber que fue exitosa y en datos el mensaje
    res.status(200).send({ok: true, datos: `El cliente ha sido creado con éxito`});
    
} catch (error) {
    console.log('error',error)
    const errores = [];

    // valido si mongoose devuelve errores de validacion, si es asi formateo los mensajes en un array pa devolverlos al cliente
    if(error.errors){
      Object.keys(error.errors).forEach(field => {
        errores.push(error.errors[field].message);
      });
    }else{
      errores.push("El cliente no pudo ser creado");
    }
    
    res.status(500).send({ok: false, datos: `Error al crear el cliente`,errores});
    }
};


exports.registrarCliente = async (req, res) => {
  try {
    const nuevoCliente = new clientes({
        rol:'cliente',
        cedula:req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechadenacimiento: req.body.fechadenacimiento,
        email: req.body.email,
        password:req.body.password,
        telefono:req.body.telefono,
        planActivo:null
    });

    await nuevoCliente.save();
    // retorno al login el registro fue exitoso
    return res.render('pages/login',{exitomensaje:'El registro fue realizado con exito!'})

    
} catch (error) {

    console.log('error',error)

    let mensaje_error = "";
    
    if(error.errors){
      Object.keys(error.errors).forEach(field => {
        mensaje_error = error.errors[field].message;
      });
    }else{
      mensaje_error = "No se logro registrar el usuario";
    }
    
    return res.render('pages/signup',{errormensaje:mensaje_error});

  }
};

const validarCliente = async(id_)=>{

  try {

    const cliente = await clienteDataAccess.buscarunClienteId(id_);
    if (!cliente) {
      console.log('Usuario no encontrado.');
      return false;
    }
    if (cliente.id === id) {
      console.log('Usuario validado con éxito.');
      return true;
    } else {
      console.log('Cliente no encontrado.');
      return false;
    }
  } catch (error) {
    console.error('Error al validar el cliente:', error);
    return false;
  }
}

const validarAdmin = async(email)=>{

  try {

    const cliente = await clienteDataAccess.buscarAdmin(email);
    if (!cliente) {
      console.log('No existe ese usuario fue encontrado.');
      return false;
    }
    if (cliente.email === email) {
      console.log('Validado con éxito.');
      return true;
    } else {
      console.log('No encontrado.');
      return false;
    }
  } catch (error) {
    console.error('Error al validar el Usuario:', error);
    return false;
  }
}
 
//caso de uso para obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    // Usamos la función find del data access para obtener todos los clientes de la base de datos
    const clientes = await clienteDataAccess.buscarClientes();
    // Devolvemos un código de estado 200 y el array de clientes
    return res.status(200).json({ ok: true, datos: clientes});
  } catch (err) {
    // Si ocurre algún error en el proceso, devolvemos un código de estado 500 y el mensaje de error
    return res.status(500).json({ ok: false, datos: 'Error al obtener cliente' });
  }
};

//caso de uso para obtener un cliente por su cédula
exports.obtenerCliente = async (req, res) => {
  try {
    // Obtenemos la cédula del cliente del parámetro de la ruta
    const { id } = req.params;
    // Usamos la función findOne del data access para obtener el cliente que coincida con la cédula
    const clienteEncontrado = await clienteDataAccess.buscarunClientePorId(id);
    // Si no se encuentra ningún cliente, devolvemos un código de estado 404 y un mensaje indicando que no existe
    if (!clienteEncontrado) {
      return res.status(404).json({ ok: false, datos: `No se encontró ningún cliente el id ${id}` });
    }
    // Si se encuentra el cliente, devolvemos un código de estado 200 y el cliente encontrado
    return res.status(200).json({ ok: true, datos: clienteEncontrado });
  } catch (err) {
    // Si ocurre algún error en el proceso, devolvemos un código de estado 500 y el mensaje de error
    return res.status(500).json({ ok: false, datos: 'Error en la obtención del cliente' });
  }
};

exports.obtenerAdmin = async (req, res) => {
  try {
    const { email } = req.params;
    const adminEncontrado = await clienteDataAccess.buscarAdmin(email);
    if (!adminEncontrado) {
      return res.status(404).json({ ok: false, datos: `No se encontró el email ${email}` });
    }
    return res.status(200).json({ ok: true, datos: adminEncontrado });
  } catch (err) {
    return res.status(500).json({ ok: false, datos: 'Error en la obtención de los datos' });
  }
};


// caso de uso para actualizar un cliente 
exports.actualizarCliente = async (req, res) => {
  try {
    // Obtenemos la cédula del cliente del parámetro de la ruta
    const { id } = req.params;
    // Obtenemos los datos del cliente del cuerpo de la petición
    const { nombre, apellido, fechadenacimiento, email, telefono, password,rol,cedula } = req.body;

    const datosActualizar = {
      nombre, apellido, fechadenacimiento, email, telefono, password,rol,cedula
    }

     const { error, value } = validarCliente(id);
    //  Si hay algún error en la validación, devolvemos un código de estado 400 y el mensaje de error
     if (error) {
       return res.status(400).json({ ok: false, datos: error.message });
     }

    // Si no hay error, usamos la función findOneAndReplace del data access para reemplazar el cliente que coincida con la cédula por uno nuevo con los datos recibidos
    const nuevoCliente = await clienteDataAccess.actualizar( id, datosActualizar );
     // Si no se encuentra ningún cliente, devolvemos un código de estado 404 y un mensaje indicando que no existe
     if (!nuevoCliente) {
       return res.status(404).json({ ok:false, datos: 'Error en la actualización',  });
     }
    // Si se encuentra y se reemplaza el cliente, devolvemos un código de estado 200 y el nuevo cliente creado

    res.status(200).json({ ok: true, datos: 'Cliente actualizado con exito' });
  } catch (error) {
    // Si ocurre algún error en el proceso, devolvemos un código de estado 500 y el mensaje de error
    const errores = [];
    
    // valido si mongoose devuelve errores de validacion, si es asi formateo los mensajes en un array pa devolverlos al cliente
    if(error.errors){
      Object.keys(error.errors).forEach(field => {
        errores.push(error.errors[field].message);
      });
    }else{
      errores.push("El cliente no pudo ser actualizado");
    }
    return res.status(500).json({ ok: false, datos: 'Error al actualizar el cliente', errores });
  }
};

exports.actualizarClienteAdmin = async (req, res) => {

  try {
    const { email: emailAdmin } = req.cookies;
    const { nombre, apellido, fechadenacimiento, email, telefono, password,cedula } = req.body;

    const datosActualizar = {
      nombre, apellido, fechadenacimiento, email, telefono, password,cedula
    }

    
    const { error, value } = validarAdmin(emailAdmin);
    if (error) {
      return res.status(400).json({ ok: false, datos: error.message });
    }
    
    const cliente = await clienteDataAccess.buscarAdmin(emailAdmin);

    const actualizacionCliente = await clienteDataAccess.actualizar( cliente.id, datosActualizar );
     if (!actualizacionCliente) {
       return res.status(404).json({ ok:false, datos: 'Error en la actualización'});
     }

    res.status(200).json({ ok: true, datos: 'Actualizado con exito' });
  } catch (error) {
    const errores = [];
    
    if(error.errors){
      Object.keys(error.errors).forEach(field => {
        errores.push(error.errors[field].message);
      });
    }else{
      errores.push(`No pudo ser actualizado ${error}`);
    }
    return res.status(500).json({ ok: false, datos: 'Error al actualizar ', errores });
  }
};

exports.actualizarFotoDePerfil = async (req, res) => {

  const {email} = req.cookies
  const { file } = req

  if (!file || Object.keys(file).length === 0) {
    return res.status(400).send({ ok: false, msg: 'No hay ningún archivo' });
  }

  const pathStorage = `/img/${file.filename}`;

  const datosActualizar = {imgUser: pathStorage}
  const cliente = await clienteDataAccess.buscarAdmin(email);

  const actualizarImg = await clienteDataAccess.actualizar( cliente.id, datosActualizar );

  if (!actualizarImg) {
    return res.status(404).json({ ok:false, datos: 'Error en la actualización de la Imagen'});
  }

  return res.status(200).json({ ok: true, datos: 'Imagen actualizada con exito' });
}


// caso de uso para eliminar un cliente por su cédula
exports.eliminarCliente = async (req,res) => {
  try {
    const { id } = req.params;

    // Llamar a la función de la capa de acceso a datos para buscar y eliminar el cliente por su número de cédula
    const clienteEliminado = await clienteDataAccess.buscaryeliminar(id);

    if (!clienteEliminado) {
      // throw new Error('Cliente no encontrado o ya eliminado');
      return res.status(400).json({ok: false, datos: 'Cliente no encontrado o ya eliminado'});
    }
    return res.status(200).json({ ok: true, datos: `Cliente con identificador ${id} se ha eliminado` });
    
  } catch (error) {
    return res.status(400).json({ok: false, datos: 'Error al eliminar el cliente'});
  }
};


