var Usuario = require('./models/users')

module.exports.crearUsuarioDemo = callback => {
    
    const arr = [
        {email: 'admin@mail.com', user: "admin", password: "admin"},
        {email: 'demo@demo.com', user: "demo", password: "demo"}
    ],
        texto = 'Utilice los siguientes datos: </br>Usuario: admin | Contraseña: admin </br>Usuario: demo | Contraseña: demo'

    Usuario.insertMany(arr, (error, docs) => {

        if(error){

            console.log(error)

            if(error.code == 11000){

                callback(texto)

            } else callback(error.message)

        } else callback(null, texto)

    })
    
}