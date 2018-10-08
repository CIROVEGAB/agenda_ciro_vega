let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Usuarios = require('./users'),
    autoIncrement = require('mongoose-auto-increment'),
    connection = mongoose.createConnection('mongodb://localhost:27017/agenda'),
    EventSchema = new Schema({
        title: {type: String, required: true},
        start: {type: String, required: true},
        end: {type: String, required: false},
        start_hour: {type: String, required: false},
        end_hour: {type: String, required: false},
        user: {type: Schema.ObjectId, ref: 'Usuario'}
    })

autoIncrement.initialize(connection)
EventSchema.plugin(autoIncrement.plugin, {model: 'Evento', startAt: 1})

let EventoModel = mongoose.model('Evento', EventSchema)

module.exports = EventoModel