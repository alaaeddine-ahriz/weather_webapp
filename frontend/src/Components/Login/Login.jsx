import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [formError, setFormError] = useState(false);

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.trim()) {
      setFormError(true);
      return;
    }
    axios.post("http://localhost:4000/login", { user })
      .then((res) => {
        console.log("login: " + res.data);
        if (res.data.Status === "Success") {
          onLogin({ user });
          navigate("/");
          } else {
            console.log("Identifiant incorrect");
            setFormError(true);
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
              type="user"
              placeholder="Phone number"
              autoComplete="off"
              name="user"
              className="form-control rounded-0"
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          {formError && <p className="error-message">Incorrect phone number</p>}
          <button type="submit">Log in</button>
        </form>
        {/* <p>Already Have an Account</p> */}
        <div className="back">
          <Link to="/">Retour à la météo</Link>
        </div>
        <p></p>
        <Link
          to="/register"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Don't have an account
        </Link>
      </div>
    </div>
  );
}

export default Login;
