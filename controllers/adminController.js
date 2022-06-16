const Groups = require('../models/Groups');

exports.panel = async (req, res) => {
    //const groups = await Groups.findAll({ where: { userId: req.user.id } });

    const groups = await Groups.findAll({ where: { userId: 1 } });
    
    res.render('./user/admin/panel', {
        nombrePagina: 'Panel de administracion',
        groups
    })
}