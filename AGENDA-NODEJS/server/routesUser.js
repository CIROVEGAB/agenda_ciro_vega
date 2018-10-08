const express = require('express'),
    Usuario = require('./models/users'),
    Operacion = require('./CRUD'),
    router = express.Router()

router.post('/demo', (req, res) => {

    Usuario.find({nombre: req.query.nombre}).countDocuments({}, (err, count) => {

        if(count > 0){

            res.send('Utilice los siguientes datos: </br>Usuario: admin | Contraseña: admin </br>Usuario: demo | Contraseña: demo')

        } else{

            Operacion.crearUsuarioDemo((error, result) => {

                if(error){

                    console.log(error)
                    res.send(error)

                } else res.send(result)

            })

        }

    })
    
})

router.post('/login', (req, res) => {

    let user        = req.body.user,
        password    = req.body.pass,
        sess        = req.session

    Usuario.find({user: user}).countDocuments({}, (err, count) => {
                        
        if (err) {

            console.log(err)
            res.status(500)
            res.json(err)

        } else{

            if(count == 1){

                Usuario.find({user: user, password: password}).countDocuments({}, (err, count) => {

                    if(err){

                        console.log(err)
                        res.status(500)
                        res.json(err)

                    } else{

                        if(count == 1){

                            sess.user = req.body.user
                            res.send('Validado')

                        } else res.send('Contraseña incorrecta')

                    }

                })

            } else res.send('Usuario no registrado')

        }

    })

})

router.post('/logout', (req, res) => {

    req.session.destroy(err => {

        if(err){

            console.log(err)
            res.json(err)

        } else{

            req.session = null
            res.send('logout')
            res.end()

        }

    })

})

module.exports = router