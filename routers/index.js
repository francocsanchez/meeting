const express = require('express');
const { body } = require('express-validator');
const User = require('../models/Users');
const router = express.Router();

const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');

// TODO: Validaciones de usuarios
const validationUserCreate = [
    body('email').notEmpty().withMessage('El email no debe estar vacío'),
    body('email').isEmail().withMessage('Ingrese un correo valido'),
    body('email').custom(email => {
        return User.findOne({ where: { email } }).then(user => {
            if (user) { return Promise.reject('E-mail ya existe'); }
        });
    }),
    body('name').notEmpty().withMessage('El nombre no debe estar vacío'),
    body('passwordConfirm').notEmpty().withMessage('El password de confirmacion no debe estar vacío'),
    body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) { throw new Error('Los password no coinciden'); }
        return true;
    }),
];

module.exports = function () {
    router.get('/', homeController.home);

    // TODO: Rutas de usuario
    router.get('/user/sing-up', userController.formSingUp);
    router.post('/user/sing-up', validationUserCreate, userController.singUp);
    router.get('/user/log-in', userController.logIn);

    return router;
}