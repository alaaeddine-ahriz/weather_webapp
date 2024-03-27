import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { Header } from "../WeatherApp/HeaderComponent";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5200/login", { email, password })
      .then((res) => {
        console.log("login: " + res.data);
        if (res.data.Status === "Success") {
          if (res.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/home");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      {/* <div className="login-header">
            <Header/>
        </div> */}
      <div className="login-form">
        <h2 className="login-seconnecter-titre">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-element">
            {/* <label htmlFor="email">
              <strong>Email</strong>
            </label> */}
            <input
              type="email"
              placeholder="Adresse mail"
              autoComplete="off"
              name="email"
              className="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-element">
            {/* <label htmlFor="email">
              <strong>Password</strong>
            </label> */}
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              className="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        {/* <p>Already Have an Account</p> */}
        <div className="back">
          <Link to="/">Retour à la météo</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
