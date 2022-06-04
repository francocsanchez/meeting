exports.formNewGroup = (req,res) => {
    return res.render('./user/admin/newGroup', {
        nombrePagina: 'Nuevo Grupo',
    });
}

exports.newGroup = (req,res) => {
    return res.render('./user/admin/newGroup', {
        nombrePagina: 'Nuevo Grupo',
    });
}