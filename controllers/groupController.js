const Categories = require('../models/Categories');
const Groups = require('../models/Groups');
const shortid = require('shortid');
const multer = require('multer');
const fs = require('fs');
const { validationResult } = require('express-validator');

const configMulter = {
    fileFilter(req, file, next) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            //el formato es valido
            next(null, true);
        } else {
            // el formato no es valido
            next(new Error('Formato no válido'), false);
        }
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/../public/img/upload/groups')
    },
    filename: (req, file, cb) => {
        const newFileName = `groups-${shortid.generate()}.${file.mimetype.split('/')[1]}`;
        cb(null, newFileName)
    }
})

const upload = multer({ limits: { fileSize: 100000 }, configMulter, storage }).single('img');

exports.uploadImg = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El archivo es muy grande')
                } else {
                    req.flash('error', error.message);
                }
            } else if (error.hasOwnProperty('message')) {
                req.flash('error', error.message);
            }
            res.redirect('back');
            return;
        } else {
            next();
        }
    })
}

exports.formNewGroup = async (req, res) => {
    const categories = await Categories.findAll();

    return res.render('./user/admin/newGroup', {
        nombrePagina: 'Nuevo Grupo',
        categories
    });
}

exports.newGroup = async (req, res) => {
    const validation = validationResult(req);

    if (validation.errors.length > 0) {
        !req.file ? null : fs.unlinkSync(req.file.path);
        const categories = await Categories.findAll();
        req.flash('error', validation.errors.map(error => error.msg));
        return res.render('./user/admin/newGroup', {
            nombrePagina: 'Nuevo Grupo',
            categories,
            mensajes: req.flash()
        });
    }

    const group = req.body;
    group.userId = 1;
    !req.file ? group.img = '' : group.img = req.file.filename;

    // TODO: Eliminar, remplazar fila de codigo por req.user.id
    await Groups.create(group);

    req.flash('exito', 'Grupo creado correctamente');
    res.redirect('/user/admin/panel');
}

exports.formEditGroup = async (req, res) => {
    const query = [];
    query.push(Groups.findByPk(req.params.id));
    query.push(Categories.findAll());

    const [group, categories] = await Promise.all(query);

    res.render('./user/admin/editGroup', {
        nombrePagina: `Editar grupo - ${group.name}`,
        group,
        categories
    });
}

exports.editGroup = async (req, res, next) => {
    const group = await Groups.findOne(
        {
            where: {
                id: req.params.id,
                userId: 1
            }
        })

    if (!group) {
        req.flash('error', 'Operacion no valida!');
        res.redirect('/user/admin/panel');
        return next();
    }

    const { name, description, categoryId, url } = req.body

    group.name = name;
    group.description = description;
    group.categoryId = categoryId;
    group.url = url;
    group.save();

    req.flash('exito', 'Grupo actualizado correctamente')
    res.redirect('/user/admin/panel');
}

exports.formImgGroup = async (req, res) => {
    const group = await Groups.findOne(
        {
            where: {
                id: req.params.id,
                userId: 1
            }
        })

    res.render('./user/admin/imgGroup', {
        nombrePagina: `Editando la imagen del grupo - ${group.name}`,
        group
    })
}

exports.updateImgGroup = async (req, res, next) => {
    const group = await Groups.findOne(
        {
            where: {
                id: req.params.id,
                userId: 1
            }
        })

    if (!group) {
        req.flash('error', 'Operacion no valida!');
        res.redirect('/user/log-in');
        return next();
    }

    if (req.file && group.img) {
        const imgAnt = __dirname + `/../public/img/upload/groups/${group.img}`;

        fs.unlink(imgAnt, (error) => {
            if (error) { console.log(error); }

            return;
        })
    }

    if (req.file) { group.img = req.file.filename; }

    await group.save();

    req.flash('exito', 'Imagen actualizada correctamente');
    res.redirect('/user/admin/panel');
}