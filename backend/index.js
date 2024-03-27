const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/User')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/users');

const varifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json("Error with token")
            } else {
                if(decoded.role === "admin") {
                    next()
                } else {
                    return res.json("not admin")
                }
            }
        })
    }
}

app.get('/dashboard',/*varifyUser ,*/(req, res) => {
    res.json("Success")
})

app.get('/get-nom/:nomRecherche', /*varifyUser,*/ async (req, res) =>{
    const nomRecherche = req.params.nomRecherche;

    try {
        const resultat = await UserModel.findOne({ user: nomRecherche });

        if (resultat) {
            const { nom, Prenom , Ville_par_défaut} = resultat;
            res.json({ nom, Prenom, Ville_par_défaut });
        } else {
            res.status(404).json({ message: "Aucun nom trouvé avec ce critère de recherche." });
        }
    } catch (erreur) {
        console.error("Erreur lors de la récupération du nom:", erreur);
        res.status(500).json({ message: "Erreur lors de la récupération du nom." });
    }
});

app.post('/register', (req, res) => {
    const { user, nom , Prenom, Ville_par_défaut} = req.body; // Récupérer le nom à partir du corps de la requête
    UserModel.create({ user: user, nom: nom , Prenom:Prenom, Ville_par_défaut:Ville_par_défaut}) // Utiliser le nom récupéré pour créer une nouvelle entrée dans la base de données
        .then(user => res.json("Success"))
        .catch(err => res.json(err))
})


            // bcrypt.hash(password, 10)
            // .then(hash => {
            //     UserModel.create({name, email, password: hash})
            //     .then(user => res.json("Success"))
            //     .catch(err => res.json(err))
            // }).catch(err => res.json(err))
  

app.post('/login', (req, res) => {
    const {user} = req.body;
    UserModel.findOne({user: user})
    return res.json({Status: "Success", role: user.role})
    // .then(user => {
    //     if(user) {
    //         bcrypt.compare(password, user.password, (err, response) => {
    //             if(response) {
    //               const token = jwt.sign({email: user.email, role: user.role},
    //                     "jwt-secret-key", {expiresIn: '1d'})  
    //                 res.cookie('token', token)
    //                 return res.json({Status: "Success", role: user.role})
    //             }else {
    //                 return res.json("The password is incorrect")
    //             }
    //         })
    //     } else {
    //         return res.json("No record existed")
    //     }
    // })
})


app.listen(4000, () => {
    console.log("Server is Running")
})