const Sequelize = require('sequelize');
const db = require('../config/db');
const uuid = require('uuid');
const Categories = require('./Categories');
const Users = require('./Users');

const Groups = db.define('groups', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El grupo debe tener un nombre'
            }
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Coloca una descripción'
            }
        }
    },
    url: Sequelize.TEXT,
    img: Sequelize.TEXT
})

Groups.belongsTo(Categories);
Groups.belongsTo(Users);

module.exports = Groups;