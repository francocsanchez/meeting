const Categories = require('../models/Categories');
const Groups = require('../models/Groups');
const { validationResult } = require('express-validator');

exports.formNewGroup = async (req, res) => {
    const categories = await Categories.findAll();

    return res.render('./user/admin/newGroup', {
        nombrePagina: 'Nuevo Grupo',
        categories
    });
}


exports.newGroup = async (req, res) => {
    const validation = validationResult(req);
    const group = req.body;

    if (validation.errors.length > 0) {
        const categories = await Categories.findAll();
        req.flash('error', validation.errors.map(error => error.msg));
        return res.render('./user/admin/newGroup', {
            nombrePagina: 'Nuevo Grupo',
            categories,
            mensajes: req.flash()
        });
    }
    group.userId = 1

    await Groups.create(group);

    req.flash('exito', 'Grupo creado correctamente');
    res.redirect('/user/admin/panel');
}