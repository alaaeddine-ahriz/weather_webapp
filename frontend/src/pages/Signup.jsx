import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const [user, setUser] = useState('');
    const [nom, setNom] = useState(''); // Ajout de l'état pour le nom
    const [Prenom, setPrenom] = useState('');
    const [Ville_par_défaut,setvillepardefaut] = useState("");
    const navigate = useNavigate();
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneNumberPattern = /^0[1-9]([-. ]?[0-9]{2}){4}$/;
        if (!phoneNumberPattern.test(user)) {
            setIsValidPhoneNumber(false);
            return;
        }
        setIsValidPhoneNumber(true);
        
        // Envoi des données au serveur, y compris le nom,prenom
        axios.post('http://localhost:4000/register', { user, nom, Prenom, Ville_par_défaut })
            .then(res => {
                navigate('/login');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="user">
                            <strong>Phone number</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Phone number"
                            autoComplete="off"
                            name="user"
                            className={`form-control rounded-0 ${!isValidPhoneNumber && 'is-invalid'}`}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        {!isValidPhoneNumber && (
                            <div className="invalid-feedback">Invalid number.</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nom">
                            <strong>Nom</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Nom"
                            autoComplete="off"
                            name="nom"
                            className="form-control rounded-0"
                            onChange={(e) => setNom(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Prénom">
                            <strong>Prénom</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Prénom"
                            autoComplete="off"
                            name="Prénom"
                            className="form-control rounded-0"
                            onChange={(e) => setPrenom(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Ville_par_défaut">
                            <strong>Ville par défaut</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter la ville par défaut"
                            autoComplete="off"
                            name="Ville par défaut"
                            className="form-control rounded-0"
                            onChange={(e) => setvillepardefaut(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already Have an Account</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
