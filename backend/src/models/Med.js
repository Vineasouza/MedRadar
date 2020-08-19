const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const MedSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    especialidade: {
        type: String,
        require: true,
        lowercase: true,
    },
    convenio: {
        type: [String],
        require: true
    },
    uf: {
        type: String,
        require: true
    },
    cidade: {
        type: String,
        require: true
    },
    endereço: {
        type: String,
        require: true
    },
    telefone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\(?[0]?\d{2}\)?[9]?\d{4}-?\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
});

module.exports = mongoose.model('Med', MedSchema);