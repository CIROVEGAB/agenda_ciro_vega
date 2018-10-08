const router = require('express').Router(),
    Evento = require('./models/events'),
    Usuario = require('./models/users')

let ObjectId = require('mongoose').Types.ObjectId

router.get('/all', (req, res) => {

    req.session.reload(err => {

        if(req.session.user){

            if(err){

                console.log(err)
                res.send('logout')
                res.end()

            } else{

                Usuario.findOne({user: req.session.user}).exec({}, (error, doc) => {

                    if(error){

                        console.log(error)
                        res.send('logout')

                    } else{

                        Evento.find({user: doc._id}).exec((err, doc) => {

                            if (err) {

                                console.log(err)
                                res.status(500)
                                res.json(err)

                            }
                            res.json(doc)

                        })

                    }

                })

            }

        } else{

            res.send('logout')
            res.end()

        }

    })

})

router.post('/new', (req, res) => {

    req.session.reload(err => {
        
        if(err){

            console.log(err)
            res.json('logout')

        } else{

            Usuario.findOne({user:req.session.user}).exec({}, (error, doc) => {

                Evento.nextCount((err, count) => newID = count)

                let title           = req.body.title,
                    start           = req.body.start,
                    end             = req.body.end,
                    start_hour      = req.body.start_hour,
                    end_hour        = req.body.end_hour,
                    userId          = doc._id

                let evento = new Evento({
                    title: title,
                    start: start,
                    end: end,
                    start_hour: start_hour,
                    end_hour: end_hour,
                    user: userId
                })

                evento.save(error => {

                    if(error){

                        console.log(error)
                        res.json(error)

                    }

                    res.json(newID)

                })
                
            })

        }

    })

})

router.post('/delete/:_id', (req, res) => {

    let id = req.params._id

    req.session.reload(err => {

        if(err){

            console.log(err)
            res.send('logout')

        } else{

            Evento.remove({_id: id}, error => {
                
                if(error){

                    console.log(error)
                    res.status(500)
                    res.json(error)

                }

                res.send('Registro eliminado')

            })

        }

    })

})

router.post('/update/:_id&:start&:end', (req, res) => {

    req.session.reload(err => {

        if(err){

            console.log(err)
            res.send('logout')

        } else{

            Evento.findOne({_id: req.params._id}).exec((error, result) => {

                let id      = req.params._id,
                    start   = req.params.start,
                    end     = req.params.end

                if(error){

                    console.log(error)
                    res.send(error)

                } else{

                    Evento.update({_id: id}, {start:start, end:end}, (error, result) => {

                        if (error){

                            console.log(error)
                            res.send(error)

                        } else res.send('Evento ha sido actualizado')

                    })

                }

            })

        }

    })
    
})

module.exports = router