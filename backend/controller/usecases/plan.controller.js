const Ejercicio = require('../../models/ejercicios.model');
const Plan = require('../../models/plan.model');
const planDataAccess = require('../data-access/plan.controller');

const validarPlan = async(id_)=>{

  try {

    const cliente = await planDataAccess.buscarunPlanId(id_);
    if (!cliente) {
      console.log('Plan no encontrado.');
      return false;
    }
    if (cliente.id === id) {
      console.log('Plan validado con éxito.');
      return true;
    } else {
      console.log('Plan no encontrado.');
      return false;
    }
  } catch (error) {
    console.error('Error al validar el plan:', error);
    return false;
  }
}


exports.crearPlan = async (req, res) => {
  try {
    const nuevoPlan = new Plan({
      nombre: req.body.nombre,
      frecuencia: req.body.frecuencia,
      dificultad: req.body.dificultad,
      objetivo: req.body.objetivo,
      ejercicios:req.body.ejercicios
  });

    await nuevoPlan.save();
    res.status(200).send({ok: true, datos: `El plan ha sido creado con éxito`});
    
} catch (error) {
    const errores = [];

    if(error.errors){
      Object.keys(error.errors).forEach(field => {
        errores.push(error.errors[field].message);
      });
    }else{
      errores.push("El plan no pudo ser creado");
    }
    
    
    res.status(500).send({ok: false, datos: `Error al crear el plan`,errores});
    }
};

exports.obtenerPlanes = async (req, res) => {
  try {
    const plan = await planDataAccess.buscarPlan();
    return res.status(200).json({ ok: true, datos: plan});
  } catch (err) {
    return res.status(500).json({ ok: false, datos: 'Error al obtener Planes' });
  }
};

exports.obtenerEjerciciosDePlan = async (req, res) => {
  try {
    const {idplan } = req.params
    const planEncontrado = await Plan.findById(idplan);

    if (!planEncontrado) {
      return res.status(404).json({ ok: false, datos: `No se encontró el Plan` });
    }

    const idEjercicios = planEncontrado.ejercicios; 
    const ejerciciosEncontrados = await Ejercicio.find({ _id: { $in: idEjercicios } });

    return res.status(200).json({ ok: true, datos: ejerciciosEncontrados });
  } catch (error) {
    return res.status(500).json({ ok: false, datos: `Error al buscar los ejercicios: ${error}` });
  }
};

exports.obtenerPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const planEncontrado = await planDataAccess.buscarunPlanPorId(id);
    if (!planEncontrado) {
      return res.status(404).json({ ok: false, datos: `No se encontró ningún plan con el id ${id}` });
    }
    return res.status(200).json({ ok: true, datos: planEncontrado });
  } catch (err) {
    return res.status(500).json({ ok: false, datos: `Error en la obtención del plan ${err}` });
  }
};

exports.actualizarPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, frecuencia, dificultad, objetivo, ejercicios} = req.body;

    const datosActualizar = {nombre, frecuencia, dificultad, objetivo, ejercicios }

     const { error, value } = validarPlan(id);
     if (error) {
       return res.status(400).json({ ok: false, datos: error.message });
     }

    const nuevoCliente = await planDataAccess.actualizar( id, datosActualizar );
     if (!nuevoCliente) {
       return res.status(404).json({ ok:false, datos: 'Error en la actualización',  });
     }

    res.status(200).json({ ok: true, datos: 'Plan actualizado con éxito' });
  } catch (error) {
    // Si ocurre algún error en el proceso, devolvemos un código de estado 500 y el mensaje de error
    const errores = [];
    
    if(error.errors){
      Object.keys(error.errors).forEach(field => {
        errores.push(error.errors[field].message);
      });
    }else{
      errores.push("El plan no pudo ser actualizado");
    }
    return res.status(500).json({ ok: false, datos: 'Error al actualizar el plan', errores });
  }
};

exports.eliminarPlan = async (req,res) => {
  try {
    const { id } = req.params;

    const planEliminado = await planDataAccess.buscaryeliminar(id);

    if (!planEliminado) {
      return res.status(400).json({ok: false, datos: 'Plan no encontrado o ya eliminado'});
    }
    return res.status(200).json({ ok: true, datos: `Plan con identificador ${id} se ha eliminado` });
    
  } catch (error) {
    return res.status(400).json({ok: false, datos: 'Error al eliminar el Plan'});
  }
};

