const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    roles: {
        staff: {
            type: String,
            default: 'staff'
        },
        incharge: String,
        doctor: String,
        admin: String
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
});

module.exports = mongoose.model('User', usersSchema);