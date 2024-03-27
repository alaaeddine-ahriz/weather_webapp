const { kStringMaxLength } = require('buffer')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user: String,
    // email: String,
    // password: String,
    userName: {
        type: String,
        default: "bidule"
    },
    ville:{
        type: String,
    },
    role: {
        type: String,
        default: "visitor"
    }
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel