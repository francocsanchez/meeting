const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(60),
    image: Sequelize.STRING(60),
    email: {
        type: Sequelize.STRING(30),
        alloNull: false,
        validate: {
            isEmail: { msg: 'Agrega un correo válido' }
        },
        unique: {
            args: true,
            msg: 'Usuario ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        alloNull: false,
        validate: {
            notEmpty: { msg: 'El password no puede estar vacio' }
        }
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    tokenPassword: Sequelize.STRING,
    expiraToken: Sequelize.STRING

}, {
    hooks: {
        beforeCreate(user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
        }
    }
})

Users.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = Users;