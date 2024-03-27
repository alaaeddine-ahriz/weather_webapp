const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/User');
let URL;
require('dotenv/config');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());

if (process.env.ON === 'false') {
    URL = process.env.DB_URL;
} else {
    URL = process.env.DB_URI;
}

mongoose.connect('mongodb://localhost:27017');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("Token is missing");
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json("Error with token");
            } else {
                if (decoded.role === "admin") {
                    next();
                } else {
                    return res.json("not admin");
                }
            }
        });
    }
};

app.get('/dashboard', verifyUser, (req, res) => {
    res.json("Success");
});

app.post('/register', (req, res) => {
    const { user } = req.body;
    UserModel.create({ user: user })
        .then(user => res.json("Success"))
        .catch(err => res.json(err));
});

app.post('/login', (req, res) => {
    const { user } = req.body;
    UserModel.findOne({ user: user })
    return res.json({ Status: "Success", role: user.role });
        // .then(user => {
        //     if (user) {
        //         bcrypt.compare(password, user.password, (err, response) => {
        //             if (response) {
        //                 const token = jwt.sign({ email: user.email, role: user.role },
        //                     "jwt-secret-key", { expiresIn: '1d' });
        //                 res.cookie('token', token);
        //                 return res.json({ Status: "Success", role: user.role });
        //             } else {
        //                 return res.json("The password is incorrect");
        //             }
        //         });
        //     } else {
        //         return res.json("No record existed");
        //     }
        // });
});

app.listen(process.env.PORT, () => {
    console.log("Server is Running");
});
