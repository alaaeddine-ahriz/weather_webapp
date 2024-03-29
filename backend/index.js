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
    methods: ["GET", "POST","PUT"],
    credentials: true
}));
app.use(cookieParser());

if (process.env.ON === 'false') {
    URL = process.env.DB_URL;
} else {
    URL = process.env.DB_URI;
}

mongoose.connect('mongodb://localhost:27017/Users');

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

app.get('/Dashboard', /*varifyUser,*/ async (req, res) =>{
    const { nomRecherche } = req.query; // Utilisation de req.query pour récupérer les paramètres de l'URL

    try {
        const resultat = await UserModel.findOne({ user: nomRecherche });

        if (resultat) {
            const { user, userName, Ville_par_défaut, Préférence_1 , Préférence_2 , Préférence_3  } = resultat;
            res.json({ user, userName, Ville_par_défaut, Préférence_1, Préférence_2, Préférence_3 });
        } else {
            res.status(404).json({ message: "Aucun nom trouvé avec ce critère de recherche." });
        }
    } catch (erreur) {
        console.error("Erreur lors de la récupération du nom:", erreur);
        res.status(500).json({ message: "Erreur lors de la récupération du nom." });
    }
});


app.post('/register', (req, res) => {
    const { user,username } = req.body;
    UserModel.findOne({ user: user })
    .then(existingUser => {
        if (existingUser) {
            // L'utilisateur existe déjà, renvoyer un message d'erreur
            res.status(400).json({ message: "User already exists" });
        } else {
            // L'utilisateur n'existe pas, créer une nouvelle entrée dans la base de données
            UserModel.create({ user: user , userName : username })
                .then(user => res.json("Success"))
                .catch(err => res.status(500).json(err));
        }
    })
    .catch(err => res.status(500).json(err));
});

app.put('/update', (req, res) => {
    const { user, newUserName, newCity,preferences } = req.body;
    console.log("User:", user);
    console.log("New Username:", newUserName);
    console.log("Preferences:", preferences);
    
    UserModel.findOneAndUpdate(
        { user: user }, // Condition de recherche
        { $set: { 
            userName: newUserName, 
            Ville_par_défaut: newCity,
            Préférence_1: preferences.Préférence_1,
            Préférence_2: preferences.Préférence_2,
            Préférence_3: preferences.Préférence_3
         } 
        },  // Modifications à apporter
        { new: true } // Option pour retourner le document mis à jour
      )
        .then(userDoc => {
          if (userDoc) {
            // Si un utilisateur est trouvé et mis à jour avec succès, renvoyer une réponse réussie
            res.status(200).json({ message: "User updated successfully", updatedUser: userDoc });
          } else {
            // Si aucun utilisateur correspondant n'est trouvé, renvoyer une réponse 404
            res.status(404).json({ message: "User not found" });
          }
        })
        .catch(err => {
          // En cas d'erreur, renvoyer une réponse 500 avec un message d'erreur
          console.error(err);
          res.status(500).json({ message: "An error occurred while updating user" });
        });
});




app.post('/login', (req, res) => {
    const { user } = req.body;
    UserModel.findOne({ user: user })
    .then(existingUser =>{
        if (existingUser){
            res.json({ Status: "Success", role: user.role });
        } else {
            res.status(300).json({message : "User doesn't exist"});

        }
    }).catch(err => res.status(500).json(err));

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
