const User = require('../models/Users');

exports.formSingUp = (req, res) => {
    res.render('./user/formSingUp', {
        nombrePagina: 'Crear Cuenta'
    });
}

exports.singUp = async (req, res) => {
    const user = req.body;

    const newUser = await User.create(user);

    console.log('Usuario credo')
    console.log(newUser);
}