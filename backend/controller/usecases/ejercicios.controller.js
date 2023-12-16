// Importamos el data access de ejercicios
const ejercicioDataAccess = require('../data-access/ejercicios.controller');
const ejercicios= require('../../models/ejercicios.model')

const validarEjercicio = async(id_)=>{

  try {

    const cliente = await ejercicioDataAccess.buscarunEjercicioId(id_);
    if (!cliente) {
      console.log('Ejercicio no encontrado.');
      return false;
    }
    if (cliente.id === id) {
      console.log('Ejercicio validado con éxito.');
      return true;
    } else {
      console.log('Ejercicio no encontrado.');
      return false;
    }
  } catch (error) {
    console.error('Error al validar el ejercicio:', error);
    return false;
  }
}

exports.crearEjercicio = async (req, res) => {
  try {
    const { file } = req

    let pathStorage = `/img/${file.filename}`;

    const nuevoEjercicio = new ejercicios({
      nombre: req.body.nombre,
      dificultad: req.body.dificultad,
      descripcion: req.body.descripcion,
      musculo_principal: req.body.musculo_principal,
      img:pathStorage
  });

    await nuevoEjercicio.save();
    res.status(200).send({ok: true, datos: `El ejercicio ha sido creado con éxito`});
    
} catch (error) {
    console.log('error',error)
    const errores = [];

    if(error.errors){
      Object.keys(error.errors).forEach(field => {
        errores.push(error.errors[field].message);
      });
    }else{
      errores.push("El ejercicio no pudo ser creado");
    }
    
    res.status(500).send({ok: false, datos: `Error al crear el ejercicio`,errores});
    }
};

exports.obtenerEjercicios = async (req, res) => {
  try {
    const ejercicios = await ejercicioDataAccess.buscarEjercicios();
    return res.status(200).json({ ok: true, datos: ejercicios});
  } catch (err) {
    return res.status(500).json({ ok: false, datos: 'Error al obtener ejercicios' });
  }
};

exports.obtenerEjercicio = async (req, res) => {
  try {
    const { id } = req.params;
    const ejercicioEncontrado = await ejercicioDataAccess.buscarunEjercicioPorId(id);
    if (!ejercicioEncontrado) {
      return res.status(404).json({ ok: false, datos: `No se encontró ningún ejercicio con el id ${id}` });
    }
    return res.status(200).json({ ok: true, datos: ejercicioEncontrado });
  } catch (err) {
    return res.status(500).json({ ok: false, datos: `Error en la obtención del ejercicio ${err}` });
  }
};

exports.actualizarEjercicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req

    // const { nombre, dificultad, descripcion, musculo_principal } = req.body;
    let data = req.body

    if (file !== null && file !== undefined) {
      let pathStorage = `/img/${file.filename}`;
      data.img = pathStorage
    }

     const { error, value } = validarEjercicio(id);
     if (error) {
       return res.status(400).json({ ok: false, datos: error.message });
     }

    const nuevoCliente = await ejercicioDataAccess.actualizar( id, data );
     if (!nuevoCliente) {
       return res.status(404).json({ ok:false, datos: 'Error en la actualización',  });
     }

    res.status(200).json({ ok: true, datos: 'Ejercicio actualizado con éxito' });
  } catch (error) {
    console.log('errorerrorerror --> ',error)
    // Si ocurre algún error en el proceso, devolvemos un código de estado 500 y el mensaje de error
    const errores = [];
    
    if(error.errors){
      Object.keys(error.errors).forEach(field => {
        errores.push(error.errors[field].message);
      });
    }else{
      errores.push("El ejercicio no pudo ser actualizado");
    }
    return res.status(500).json({ ok: false, datos: 'Error al actualizar el ejercicio', errores });
  }
};


exports.eliminarEjercicio = async (req,res) => {
  try {
    const { id } = req.params;

    const ejercicioEliminado = await ejercicioDataAccess.buscaryeliminar(id);

    if (!ejercicioEliminado) {
      return res.status(400).json({ok: false, datos: 'Ejercicio no encontrado o ya eliminado'});
    }
    return res.status(200).json({ ok: true, datos: `Ejercicio con identificador ${id} se ha eliminado` });
    
  } catch (error) {
    return res.status(400).json({ok: false, datos: 'Error al eliminar el ejercicio'});
  }
};
