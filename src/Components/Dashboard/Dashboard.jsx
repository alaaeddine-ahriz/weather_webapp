import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";

function Dashboard(props) {
  const user = props.user;
  const [suc, setSuc ] = useState();
  const [info, setInfo] = useState([]);
  const [editing, setEditing] = useState(false); // État pour suivre si l'utilisateur est en mode d'édition
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [successMessage, setSuccessMessage] = useState(''); // État pour gérer le message de succès
  const [newUserName, setnewUserName] = useState("");


  useEffect(() => {
      // Effectuer la requête HTTP lorsque la page est chargée
      axios.get(`http://localhost:4000/Dashboard?nomRecherche=${user}`)
        .then(res => {
          console.log("dashboard: " + res.data["nom"]);
          setInfo(res.data);
        })
        .catch(err => console.log(err));
    }, []); // Utilisation d'une liste de dépendances vide pour exécuter une fois lors du montage initial

    const toggleEditing = () => {
      if (editing) {
        axios.put("http://localhost:4000/update", { user,newUserName })
          .then(res => {
    
            if (res.data.message === "User updated successfully") {
              // Modification réussie, vous pouvez informer l'utilisateur ici
              setSuccessMessage("User updated successfully");


              axios.get(`http://localhost:4000/Dashboard?nomRecherche=${user}`)
            .then(res => {
              console.log("dashboard: " + res.data["nom"]);
              setInfo(res.data);
            })
            .catch(err => console.log(err));
            
            } else {
              // La modification a échoué, affichez un message d'erreur approprié
              alert("Failed to update user");
            }
          })
          .catch(err => {
            // Erreur lors de la requête, affichez un message d'erreur
            console.error("Error updating user:", err);
            alert("An error occurred while updating user");
          })
          .finally(() => {
            // Quelle que soit la réponse (réussie ou échouée), mettez fin à l'édition
            setEditing(false);
          });
      } else {
        // Si l'utilisateur n'est pas en mode d'édition, basculez simplement l'état d'édition
        setEditing(!editing);
      }
    };

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
              <input
                type="user"
                value={info.user}
                autoComplete="off"
                name="user"
                className="form-control rounded-0"
              />
 
          </div>
          <div className="user-id">
          {editing ? (
              <input
                type="user"
                placeholder={info.userName}
                autoComplete="off"
                name="userName_db"
                className="form-control rounded-0"
                onChange={(e) => setnewUserName(e.target.value)}
              />
            ) : (
              <input
              type="user"
              value={info.userName}
              autoComplete="off"
              name="userName"
              className="form-control rounded-0"
            />
            )}
            {successMessage && <div className="success-message">{successMessage}</div>}
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
            
            <button onClick={toggleEditing}>
              {editing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
