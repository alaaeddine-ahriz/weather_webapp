const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user: String,
    userName: String,
    role: {
        type: String,
        default: "visitor"
    },
    nom: String,
    Prenom: String,
    Ville_par_défaut: String,
    // Préférence_1: String,
    // Préférence_2: String,
    // Préférence_3: String,
},
)

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel