const express = require('express');
const path = require('path');
const routers = require('./routers')
require('dotenv').config({path: 'variables.env'});

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'./views'))

app.use('/',routers())

app.listen(process.env.PORT, () => {
    console.log('Server running... in port '+ process.env.PORT);
})