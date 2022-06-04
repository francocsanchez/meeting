const Sequelize = require('sequelize');
const db = require('../config/db');
const uuid = require('uuid');
const Categories = require('./Categories');
const Users = require('./Users');

const Grups = db.define('grups', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    }, 
    name: {
        type: Sequelize.TEXT, 
        allowNull: false, 
        validate: {
            notEmpty: {
                msg : 'El grupo debe tener un nombre'
            }
        }
    }, 
    description: {
        type: Sequelize.TEXT,
        allowNull: false, 
        validate : {
            notEmpty: {
                msg: 'Coloca una descripción'
            }
        }
    },
    url: Sequelize.TEXT, 
    img: Sequelize.TEXT
})

Grups.belongsTo(Categories);
Grups.belongsTo(Users);

module.exports = Grups;