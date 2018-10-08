let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        user: {type: String, required: true, unique: true},
        email: {type: String, required: true},
        password: {type: String, required: true}
    }),
    UsuarioModel = mongoose.model('Usuario', UserSchema)

module.exports = UsuarioModel