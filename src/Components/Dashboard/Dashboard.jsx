import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";

function Dashboard(props) {
  const user = props.user;
  const [suc, setSuc ] = useState();
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [userName, setUserName] = useState("");


  useEffect(() => {
      // Effectuer la requête HTTP lorsque la page est chargée
      axios.get(`http://localhost:4000/Dashboard?nomRecherche=${user}`)
        .then(res => {
          console.log("dashboard: " + res.data["nom"]);
          setInfo(res.data);
        })
        .catch(err => console.log(err));
    }, []); // Utilisation d'une liste de dépendances vide pour exécuter une fois lors du montage initial

  return (
    <div className="login-container">
      
      <div className="dashboard">
      <Link to="/">
        <button type="submit">Home</button>
      </Link>
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
            <p>{info.userName}</p>
          </div>
          <div className="user-id">
            <input
              type="user"
              value={info.userName}
              autoComplete="off"
              name="user"
              className="form-control rounded-0"
              onChange={(e) => setUserName(e.target.value)}
            />
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
                checked={info.Préférence_1} // Coche la case si Préférence_1 est true 
              />
              <label htmlFor="option1">Pluie</label>
              <br />
              <input
                type="checkbox"
                id="option2"
                name="option2"
                value="option2"
                checked={info.Préférence_2} // Coche la case si Préférence_2 est true
              />
              <label htmlFor="option2">Vent</label>
              <br />
              <input
                type="checkbox"
                id="option3"
                name="option3"
                value="option3"
                checked={info.Préférence_1} // Coche la case si Préférence_1 est true 
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
