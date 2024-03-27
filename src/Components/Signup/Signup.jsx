import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
function Signup() {
  const [user, setUser] = useState();
  // const [email, setEmail] = useState()
  // const [password, setPassword] = useState()
  const navigate = useNavigate();
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true); // État pour suivre si le numéro de téléphone est valide

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumberPattern = /^0[1-9]([-. ]?[0-9]{2}){4}$/;
    if (!phoneNumberPattern.test(user)) {
      // Afficher un message d'erreur ou prendre une action appropriée si le numéro n'est pas valide
      setIsValidPhoneNumber(false);
      return;
    }
    setIsValidPhoneNumber(true);
    axios
      .post("http://localhost:4000/register", { user })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-seconnecter-titre">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-element">
            {/* <label htmlFor="user">
              <strong>Phone number</strong>
            </label> */}
            <input
              type="user" // types de données accepté dans le formulaire html
              placeholder="Enter Phone number"
              autoComplete="off" // remplissage automatique des champs de formulaire
              name="user" // Nom pour donner a l'élément de formulaire // Classname permettra d'utiliser des styles
              className={`form-control rounded-0 ${!isValidPhoneNumber && "is-invalid"}`} // Modification dynamique des noms de classe en utilisant une expression java script
              onChange={(e) => setUser(e.target.value)}
            />
            {!isValidPhoneNumber && (
              <div className="invalid-feedback">Numéro invalide.</div> // Affichage du message d'erreur si le numéro n'est pas valide
            )}
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
        </form>
        <p>Already Have an Account</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
