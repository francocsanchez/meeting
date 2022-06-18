const express = require('express');
const { body } = require('express-validator');
const User = require('../models/Users');
const router = express.Router();

const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const groupController = require('../controllers/groupController');

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

const validationGroupCreate = [
    body('name').notEmpty().withMessage('El nombre no debe estar vacío'),
    body('description').notEmpty().withMessage('La descripcion no debe estar vacío'),
    body('categoryId').notEmpty().withMessage('Elija una categoria'),
];

module.exports = function () {
    router.get('/', homeController.home);

    // TODO: Rutas de usuario
    router.get('/user/sing-up', userController.formSingUp);
    router.post('/user/sing-up', validationUserCreate, userController.singUp);
    router.get('/user/:email/confirm-account', userController.confirmAccount);
    router.get('/user/log-in', userController.logIn);
    router.post('/user/log-in', authController.logIn);

    // TODO: Rutas de administracion
    router.get('/user/admin/panel', adminController.panel);
    router.get('/user/admin/panel/new-group', groupController.formNewGroup);
    router.post('/user/admin/panel/new-group', groupController.uploadImg, validationGroupCreate, groupController.newGroup);

    // TODO: Rutas de grupos
    router.get('/groups/edit-group/:id', groupController.formEditGroup);
    router.post('/groups/edit-group/:id', groupController.editGroup);
    router.get('/groups/edit-group-img/:id', groupController.formImgGroup);
    router.post('/groups/edit-group-img/:id', groupController.uploadImg, groupController.updateImgGroup);
    router.get('/groups/delete-group/:id', groupController.formDeleteGroups);
    router.post('/groups/delete-group/:id', groupController.deleteGroup);

    return router;
}