const { kStringMaxLength } = require('buffer')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user: String,
    userName: String,
    role: {
        type: String,
        default: "visitor"
    },
    Ville_par_défaut: {
        type: String,
        default : "Lyon"
    },
    Préférence_1: {
        type: Boolean,
        default: true
    },
    Préférence_2: {
        type: Boolean,
        default: true
    },
    Préférence_3: {
        type: Boolean,
        default: true
    },
    Préférence_4: {
        type: Boolean,
        default: false
    },
    Préférence_5: {
        type: Boolean,
        default: false
    }
},
)

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel