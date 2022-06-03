const User = require('../models/Users');
const enviarEmail = require('../handlers/emails');
const { validationResult } = require('express-validator');

exports.formSingUp = (req, res) => {
    res.render('./user/formSingUp', {
        nombrePagina: 'Crear Cuenta'
    });
}

exports.singUp = async (req, res) => {
    const validation = validationResult(req);
    const user = req.body;

    if (validation.errors.length > 0) {
        req.flash('error', validation.errors.map(error => error.msg));
        return res.render('./user/formSingUp', {
            nombrePagina: 'Crear tu cuenta',
            mensajes: req.flash()
        });
    }

    await User.create(user);

    const url = `http://${req.headers.host}/confir-acount/${user.email}`;

    await enviarEmail.enviarEmail({
        user,
        url,
        subject: 'Confirma tu cuenta de Meeti',
        file: 'confirmAccount'
    })

    req.flash('exito', 'Verifica tu correo electronico para activar la cuenta');
    res.redirect('/user/log-in');

}

exports.logIn = (req, res) => {
    res.render('./user/formLogIn', {
        nombrePagina: 'Iniciar sesion'
    })
}