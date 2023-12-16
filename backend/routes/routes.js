const express = require('express');
const multer = require("multer");
const router = express.Router();
const clientes = require('../models/clientes.model');
const plans = require('../models/plan.model');
const ejercicios = require('../models/ejercicios.model');

const middleware = {
    confirmarLogueo: function(req, res, next) {
        if (!req.cookies.email) {

            return res.redirect('/api/v1/login'); // Redirigir al inicio de sesión si no hay cookie de sesión
        }
        next(); // Continuar con la solicitud si el usuario está autenticado
    },
    esAdministrador: async function(req, res, next) {
        const email = req.cookies?.email;
        const usuario = await clientes.findOne({ email });
        if(usuario && usuario.rol === 'admin'){
            return next();
        }
        return res.render('default/403')
       
    },
    esCliente: async function(req, res, next) {
        const email = req.cookies?.email;
        const usuario = await clientes.findOne({ email });
        if(usuario && usuario.rol === 'cliente'){
            return next();
        }
        return res.render('default/403')
       
    },
}

const guardarImagenes = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../static/img/`;
        cb(null, pathStorage);
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);
    }
});

const subirArchivo = multer({ storage: guardarImagenes })


//controllers
const clientesController = require('../controller/usecases/clientes.controller');
const ejerciciosController = require('../controller/usecases/ejercicios.controller');
const planesController = require('../controller/usecases/plan.controller');
const Cliente = require('../models/clientes.model');
const Plan = require('../models/plan.model');
const Ejercicio = require('../models/ejercicios.model');


//clientes
router.get('/obtenercliente/:id', [middleware.confirmarLogueo,middleware.esAdministrador] , clientesController.obtenerCliente);
router.get('/obtenerclientes', [middleware.confirmarLogueo,middleware.esAdministrador] ,clientesController.obtenerClientes);
router.post('/crearcliente', [middleware.confirmarLogueo,middleware.esAdministrador], clientesController.crearCliente);
router.post('/actualizarcliente/:id', [middleware.confirmarLogueo,middleware.esAdministrador],  clientesController.actualizarCliente);
router.delete('/eliminarcliente/:id', [middleware.confirmarLogueo,middleware.esAdministrador], clientesController.eliminarCliente);

router.post('/actualizarperfiladmin', [middleware.confirmarLogueo,middleware.esAdministrador], clientesController.actualizarClienteAdmin);
router.post('/actualizarperfilcliente', [middleware.confirmarLogueo,middleware.esCliente], clientesController.actualizarClienteAdmin);
router.post('/actualizarfotoperfil', [middleware.confirmarLogueo, subirArchivo.single("image")], clientesController.actualizarFotoDePerfil);

//ejercicios
router.get('/obtenerejercicio/:id', [middleware.confirmarLogueo,middleware.esAdministrador], ejerciciosController.obtenerEjercicio);
router.get('/obtenerejercicios', [middleware.confirmarLogueo,middleware.esAdministrador], ejerciciosController.obtenerEjercicios);

router.post('/crearejercicio', [middleware.confirmarLogueo,middleware.esAdministrador, subirArchivo.single("image")], ejerciciosController.crearEjercicio);

router.post('/actualizarejercicio/:id', [middleware.confirmarLogueo,middleware.esAdministrador, subirArchivo.single("image")], ejerciciosController.actualizarEjercicio);
router.delete('/eliminarejercicio/:id', [middleware.confirmarLogueo,middleware.esAdministrador] ,ejerciciosController.eliminarEjercicio);

//planes
router.get('/obtenerplan/:id', [middleware.confirmarLogueo,middleware.esAdministrador], planesController.obtenerPlan);
router.get('/obtenerplanes', [middleware.confirmarLogueo,middleware.esAdministrador], planesController.obtenerPlanes);
router.post('/crearplan', [middleware.confirmarLogueo,middleware.esAdministrador], planesController.crearPlan);
router.post('/actualizarplan/:id', [middleware.confirmarLogueo,middleware.esAdministrador], planesController.actualizarPlan);
router.delete('/eliminarplan/:id',[middleware.confirmarLogueo,middleware.esAdministrador], planesController.eliminarPlan);
router.get('/obtenerejerciciosdeplan/:idplan', [middleware.confirmarLogueo,middleware.esCliente], planesController.obtenerEjerciciosDePlan);




//pages

//inicio
router.get('/inicio', (req, res) => {
    res.render('pages/inicio')
});
router.get('/sobrenosotros', (req, res) => {
    res.render('pages/sobrenosotros')
});
router.get("/recuperar", function (req, res) {
    res.render("pages/recuperar");
})
router.get("/ejercicios", async (req, res) => {
    const listaejercicios = await ejercicios.find().select('-_id -__v');


    res.render("pages/ejercicios", { listaejercicios });
});
router.get("/planes", async (req, res) => {
    // Obtener los planes
    let listaplanes = await plans.find().populate('ejercicios')
    res.render("pages/planes", { listaplanes });
    
});



//Perfiles de usuario

router.get('/admindashboard', [middleware.confirmarLogueo,middleware.esAdministrador], async (req, res) => {
    const email = req.cookies?.email;
    const cliente = await Cliente.findOne({email : email});
    const c = {...cliente._doc};
    if(c.fechadenacimiento ){
        c.fechadenacimiento = c.fechadenacimiento.toISOString().substring(0,10);
    }

    res.render('pages/admindashboard', { cliente:c })
});
router.get('/perfilcliente', [middleware.confirmarLogueo,middleware.esCliente], async (req, res) => {
    const email = req.cookies?.email;
    const cliente = await Cliente.findOne({email : email});
    const c = {...cliente._doc};
    if(c.fechadenacimiento ){
        c.fechadenacimiento = c.fechadenacimiento.toISOString().substring(0,10);
    }
    let ejercicios = [];

    if(cliente && cliente.planActivo !== null){

        const planEncontrado = await Plan.findById(cliente.planActivo);

        if (planEncontrado) {

            const idEjercicios = planEncontrado.ejercicios; 
            ejercicios = await Ejercicio.find({ _id: { $in: idEjercicios } });  
        }
    
    }
   
    const planes = await Plan.find();

    res.render('pages/perfilcliente', { cliente:c,planes,ejercicios })
});





//Listas publicas
router.get("/listaclientes", [middleware.confirmarLogueo,middleware.esAdministrador], async (req, res) => {
    const listaclientes = await clientes.find();
    res.render("pages/listas/listaclientes", { listaclientes });
});
router.get("/listaplanes", [middleware.confirmarLogueo,middleware.esAdministrador], async (req, res) => {
    const listaplanes = await plans.find();
    const listaejercicios = await ejercicios.find();
    res.render("pages/listas/listaplanes", { listaplanes,listaejercicios });
});
router.get("/listaejercicios", [middleware.confirmarLogueo,middleware.esAdministrador], async (req, res) => {
    const listaejercicios = await ejercicios.find();
    res.render("pages/listas/listaejercicios", { listaejercicios });
});



router.get("/ejercicios", async (req, res) => {
    const listaejercicios = await ejercicios.find();
    res.render("pages/ejercicios", { listaejercicios });
});
router.get("/planes", async (req, res) => {
    const listaplanes = await plans.find();
    res.render("pages/planes", { listaplanes });
});





//Iniciar sesion ruta
router.get('/login', (req, res) => {
    res.render('pages/login')
});
router.get("/recuperar", (req, res) => {
    res.render("pages/recuperar");
})

//Registrar ruta
router.get('/signup', (req, res) => {
    res.render('pages/signup')
});

router.post('/signup', clientesController.registrarCliente)


//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const cliente = await clientes.findOne({ email });


        if (!cliente) {
            return res.render('pages/login',{errormensaje:'Usuario no existe'})
        } 

        // Verificar las credenciales
        if (cliente.password !== password) {
            return res.render('pages/login',{errormensaje:'Credenciales incorrectas'})
        }


        // Establecer una cookie de sesión con el nombre de usuario
        res.cookie('email', email, { maxAge: 900000, httpOnly: true });



        // Verificar el rol del usuario y redireccionar según el rol
        if (cliente.rol === 'admin') {
            return res.redirect('/api/v1/admindashboard');
        } else if (cliente.rol === 'cliente') {
            return res.redirect('/api/v1/perfilcliente');
        } else {
            return res.status(403).send('Acceso no autorizado');
        }
    } catch (error) {
        console.error(error);
        return res.render('pages/login',{errormensaje:'Error interno del servidor'})
    }


});


//cerrar sesión
router.get('/logout', (req, res) => {
    res.clearCookie('email');
    res.redirect('/api/v1/login');
});


//recuperar
router.post('/recuperar', async (req, res) => {
    const { email } = req.body;

    try {
        const cliente = await clientes.findOne({ email });

        if (cliente) {
            const mensaje = `Tu contraseña es: ${cliente.password}`; // Aquí se obtiene la contraseña del usuario
            await enviarCorreo(email, 'Recuperación de Contraseña', mensaje);
        
            return res.render('pages/recuperar',{exitomensaje:'Correo enviado con la contraseña.'})
        } else {
            return res.render('pages/recuperar',{errormensaje:'El correo electrónico no está registrado.'})
   
        }
    } catch (error) {
        return res.render('pages/recuperar',{errormensaje:'Error al procesar la solicitud'})

    }
});


router.post('/cambiarplan', [middleware.confirmarLogueo,middleware.esCliente] , async (req,res) => {
    try {
        let {plan} = req.body;
        plan = plan === "null" ? null : plan;
        const email = req.cookies.email;

        const cliente = await clientes.findOne({ email });
        if(cliente){
       
            await Cliente.findByIdAndUpdate(cliente.id, {planActivo:plan}, { new: true });
         
            return res.status(200).json({ok:true,datos:'El plan fue actualizado con exito'});
        }

        return res.status(500).json({ok:false,datos:'El plan no pudo ser actualizado'});
        
    } catch (error) {
        return res.status(500).json({ok:false,datos:'El plan no pudo ser cambiado'});
    }
})


module.exports = router;