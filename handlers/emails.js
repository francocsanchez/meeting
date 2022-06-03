const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');
const fs = require('fs');
const util = require('util');
const ejs = require('ejs');

var transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

exports.enviarEmail = async (options) => {

    // leer el archivo para el mail
    const archivo = __dirname + `/../views/emails/${options.file}.ejs`;

    // compilarlo
    const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));

    // crear el HTML
    const html = compilado({ url: options.url });

    // configurar las opciones del email
    const optionsEmail = {
        from: 'Meeti <noreply@meeti.com>',
        to: options.user.email,
        subject: options.subject,
        html
    }

    // enviar el mail
    const sendEmail = util.promisify(transport.sendMail, transport);
    return sendEmail.call(transport, optionsEmail);
}