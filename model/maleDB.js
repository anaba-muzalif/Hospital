const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maleSchema = new Schema({
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
        default: "Male Ward"
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

module.exports = mongoose.model('MalePatient', maleSchema);