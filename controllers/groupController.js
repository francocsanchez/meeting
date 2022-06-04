const Categories = require('../models/Categories');

exports.formNewGroup = async (req,res) => {
    const categories = await Categories.findAll();
    
    return res.render('./user/admin/newGroup', {
        nombrePagina: 'Nuevo Grupo',
        categories
    });
}

exports.newGroup = (req,res) => {
    return res.render('./user/admin/newGroup', {
        nombrePagina: 'Nuevo Grupo',
    });
}