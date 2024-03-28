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
    }
    // Préférence_1: String,
    // Préférence_2: String,
    // Préférence_3: String,
},
)

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel