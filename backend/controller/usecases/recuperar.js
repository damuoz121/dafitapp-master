// Importar nodemailer
const nodemailer = require('nodemailer');

// Crear una función para enviar el correo de recuperación
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dafit.app.dev@gmail.com',
      pass: 'dafit.dev'
    }
  });

  const enviarCorreo = async (destinatario, asunto, mensaje) => {
    try {
        await transporter.sendMail({
          from: 'dafit.app.dev@gmail.com',
          to: userEmail,
          subject: 'Recuperar contraseña',
          text: 'Hola, hemos recibido una solicitud para recuperar tu contraseña. Por favor, haz clic en el siguiente enlace para verificar tu identidad y cambiar tu contraseña.',
        });
        console.log('Correo enviado correctamente');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};
  // Definir las opciones del mensaje
module.exports = enviarCorreo;