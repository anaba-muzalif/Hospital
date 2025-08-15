const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maternitySchema = new Schema({
    firstname: {
        type: String,
        required: true
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
        default: "maternity ward"
    },
    bedNumber: {
        type: Number,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    admissionDate: {
        type: Date,
        default: Date.now,
    },
    dischargeDate: Date
});

module.exports = mongoose.model('MaternityPatient', maternitySchema);