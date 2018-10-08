const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    routes = require('./server/routes'),
    routesUsers = require('./server/routesUser'),
    routesEvents = require('./server/routesEvents'),
    app = express(),
    PORT = 3000
    
mongoose.connect('mongodb://localhost:27017/agenda')
    .then(db => console.log('db connected'))
    .catch(err => console.log(err))

app.set('views', `${__dirname}/client/views`)
app.set('view engine', 'pug')

app.use(express.static(`${__dirname}/client`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({
    secret: 'secret-pass',
    cookie: {maxAge: 3600000},
    resave: false,
    saveUninitialized: true,
}))

app.use('/', routes)
app.use('/usuarios', routesUsers)
app.use('/events', routesEvents)

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`))