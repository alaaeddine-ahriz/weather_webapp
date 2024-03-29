import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";

function Dashboard(props) {
  const user = props.user;
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/Dashboard`)
      .then((res) => {
        console.log("dashboard: " + res.data["nom"]);
        setInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="login-container">
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="profil">
          <div className="photo">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
          </div>
          <div className="nom-prenom">
            {/* <p>{info["nom"] + " " + info["Prenom"]}</p> */}
            <p>AHRIZ Alaaeddine</p>
          </div>
          <div className="user-id">
            <p className="nom">{info["user"]}</p>
          </div>
          <div className="preferences">
            <div className="ville">
              <p> <strong>Ville par défaut </strong></p>
              <p> {info["Ville_par_défaut"] || "Lyon"} </p>
            </div>
            <p><strong>Préférences</strong> </p>
            <div className="option">
              <input
                type="checkbox"
                id="option1"
                name="option1"
                value="option1"
              />
              <label htmlFor="option1">Pluie</label>
              <br />
              <input
                type="checkbox"
                id="option2"
                name="option2"
                value="option2"
              />
              <label htmlFor="option2">Vent</label>
              <br />
              <input
                type="checkbox"
                id="option3"
                name="option3"
                value="option3"
              />
              <label htmlFor="option3">Humidité</label>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
