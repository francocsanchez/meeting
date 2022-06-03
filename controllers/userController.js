exports.formSingUp = (req, res) => {
    res.render('./user/formSingUp', {
        nombrePagina: 'Crear Cuenta'
    });
}