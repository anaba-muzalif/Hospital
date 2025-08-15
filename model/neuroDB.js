const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const neuroShema = new Schema({
    firstname: {
        type: String,
        requireq: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    ward: {
        type: String,
        default: "Neuro-surgical ward"
    },
    admissionDate: {
        type: Date,
        default: Date.now
    },
    bedNumber: {
        type: Number,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    dischargeDate: Date
})

module.exports = mongoose.model('NeuroPatient', neuroShema);