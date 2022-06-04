exports.panel = (req, res) => {
    res.render('./user/admin/panel', {
        nombrePagina: 'Panel de administracion'
    })
}