const express = require('express');
const path = require('path');
const routers = require('./routers');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');

// TODO: Conect BD
const db = require('./config/db');
require('./models/Users');
require('./models/Categories');
require('./models/Groups');
db.sync().then(() => console.log('DB conectada')).catch((error) => console.log(error));

require('dotenv').config({ path: 'variables.env' });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }))

app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: process.env.secret,
    key: process.env.key,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
})

app.use('/', routers())

app.listen(process.env.PORT, () => {
    console.log('Server running... in port ' + process.env.PORT);
})