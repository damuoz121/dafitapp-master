//cliente
/**
 *@swagger
 *  components:
 *  schemas:
 *      Cliente:
 *          type: object
 *          properties:
 *              rol:
 *                  type: string
 *                  description: rol
 *              cedula:
 *                  type: string
 *                  description: id del cliente
 *              nombre:
 *                  type: string
 *                  description: el nombre del cliente
 *              apellido:
 *                  type: string
 *                  description: el apellido del cliente
 *              fechadenacimiento:
 *                  type: date
 *                  description: fecha de nacimiento
 *              email:
 *                  type: string
 *                  description: el email del cliente
 *              telefono:
 *                  type: string
 *                  description: el telefono del cliente
 *          required:
 *              -cedula
 *              -nombre
 *              -apellido
 *              -fechadenacimiento
 *              -email
 *              -telefono
 *          example:
 *              cedula: 0101011001
 *              usuario: danielitom
 *              nombre: Daniel
 *              apellido: Munoz
 *              fechadenacimiento: 1996-01-06
 *              email: danielito@mail.com
 *              telefono: 3010303030
 */
 /**
 * @swagger
 * /api/v1/crearcliente:
 *  post:
 *    summary: crear un cliente
 *    tags: [Cliente]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Usuario'
 *    responses:
 *      200:
 *        description: create a client!
 */
/**
 * @swagger
 * /api/v1/obtenerclientes:
 *  get:
 *    summary: obtener clients
 *    tags: [Cliente]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Clientes'
 *    responses:
 *      200:
 *        description: obtener todos los clientes!
 */
/**
 * @swagger
 * /api/v1/actualizarcliente:
 *  put:
 *    summary: actualizar cliente
 *    tags: [Cliente]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Clientes'
 *    responses:
 *      200:
 *        description: actualizar cliente!
 */
/**
 * @swagger
 * /api/v1/eliminarcliente:
 *  delete:
 *    summary: eliminar cliente
 *    tags: [Cliente]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Clientes'
 *    responses:
 *      200:
 *        description: eliminar cliente!
 */
//ejercicios
/**
 *@swagger
 *  components:
 *  schemas:
 *      Ejercicio:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: el nombre del ejercicio
 *              dificultad:
 *                  type: number
 *                  description: la dificultad del ejercicio
 *              descripcion:
 *                  type: string
 *                  description: la descripcion del ejercicio
 *              musculatura:
 *                  type: string
 *                  description: la musculatura implicada del ejercicio
 *          required:
 *              -nombre
 *              -dificultad
 *              -descripcion
 *              -musculatura
 *          example:
 *              nombre: 
 *              dificultad: 
 *              descripcion: 
 *              musculatura:
 */
 /**
 * @swagger
 * /api/v1/crearejercicio:
 *  post:
 *    summary: crear un ejercicio
 *    tags: [Ejercicio]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Ejercicio'
 *    responses:
 *      200:
 *        description: crear ejercicio!
 */
/**
 * @swagger
 * /api/v1/obtenerejercicios:
 *  get:
 *    summary: obtener ejercicios
 *    tags: [Ejercicio]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Ejercicio'
 *    responses:
 *      200:
 *        description: obtener todos los ejercicios!
 */
/**
 * @swagger
 * /api/v1/actualizarejercicio:
 *  put:
 *    summary: actualizar ejercicio
 *    tags: [Ejercicio]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Ejercicio'
 *    responses:
 *      200:
 *        description: actualizar ejercicio!
 */
/**
 * @swagger
 * /api/v1/eliminarejercicio:
 *  delete:
 *    summary: eliminar ejercicio
 *    tags: [Ejercicio]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Ejercicio'
 *    responses:
 *      200:
 *        description: eliminar ejercicio!
 */
//rutina
/**
 *@swagger
 *  components:
 *  schemas:
 *      Rutina:
 *          type: object
 *          properties:
 *              dia:
 *                  type: string
 *                  description: numero de la sesion
 *              ejercicios:
 *                  type: Array
 *                  description: Los ejercicios que componen la rutina
 *          required:
 *              -dia
 *              -ejercicios
 *          example:
 *              dia: 
 *              ejercicios: 
 */
 /**
 * @swagger
 * /api/v1/crearrutina:
 *  post:
 *    summary: crear una rutina
 *    tags: [Rutina]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Rutina'
 *    responses:
 *      200:
 *        description: crear rutina!
 */
/**
 * @swagger
 * /api/v1/obtenerrutinas:
 *  get:
 *    summary: obtener rutina
 *    tags: [Rutina]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Rutina'
 *    responses:
 *      200:
 *        description: obtener todos las rutinas!
 */
/**
 * @swagger
 * /api/v1/actualizarrutina:
 *  put:
 *    summary: actualizar rutina
 *    tags: [Rutina]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Rutina'
 *    responses:
 *      200:
 *        description: actualizar rutina!
 */
/**
 * @swagger
 * /api/v1/eliminarrutina:
 *  delete:
 *    summary: eliminar rutina
 *    tags: [Rutina]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Rutina'
 *    responses:
 *      200:
 *        description: eliminar rutina!
 */
//plan
/**
 *@swagger
 *  components:
 *  schemas:
 *      Plan:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: el nombre del ejercicio
 *              frecuencia:
 *                  type: number
 *                  description: la dificultad del ejercicio
 *              dificultad:
 *                  type: number
 *                  description: la descripcion del ejercicio
 *              objetivo:
 *                  type: string
 *                  description: la musculatura implicada del ejercicio
 *              rutina:
 *                  type: string
 *                  description: la musculatura implicada del ejercicio
 *          required:
 *              -nombre
 *              -frecuencia
 *              -dificultad
 *              -objetivo
 *              -rutinas
 *          example:
 *              nombre:
 *              frecuencia: 
 *              dificultad: 
 *              objetivo: 
 *              rutinas:
 */
 /**
 * @swagger
 * /api/v1/crearplan:
 *  post:
 *    summary: crear un plan
 *    tags: [Plan]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Plan'
 *    responses:
 *      200:
 *        description: crear plan!
 */
/**
 * @swagger
 * /api/v1/obtenerplan:
 *  get:
 *    summary: obtener plan
 *    tags: [Plan]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Plan'
 *    responses:
 *      200:
 *        description: obtener todos los planes!
 */
/**
 * @swagger
 * /api/v1/actualizarplan:
 *  put:
 *    summary: actualizar plan
 *    tags: [Plan]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Plan'
 *    responses:
 *      200:
 *        description: actualizar plan!
 */
/**
 * @swagger
 * /api/v1/eliminarplan:
 *  delete:
 *    summary: eliminar plan
 *    tags: [Plan]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Plan'
 *    responses:
 *      200:
 *        description: eliminar plan!
 */