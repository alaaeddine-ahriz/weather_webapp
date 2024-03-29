import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css"
import axios from 'axios'


function Dashboard(props) {

    const user = props.user;
    const [suc, setSuc ] = useState();
    const [info, setInfo] = useState([]);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    
    
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
        <>
            <div>
                <h2>Dashboard</h2>
                <p>{suc}</p>
                <p>Contenu du cookie "userData" : {user}</p> {/* Nouveau paragraphe pour afficher le contenu du cookie */}
            </div>
            
            <div className='dashboard'>
                <div className='profil'>
                    <div className='photo'>
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
                    </div>
                    <div className='info-widget'>
                        <p>{info["userName"]}</p>
                    </div>
                    <div className='info-widget'>
                        <p>{info["user"]}</p>
                    </div>
                    <div className='preferences'>
                        <p>Préférences</p>
                        <div className='info-widget'>
                            <p>{info["Ville_par_défaut"]}</p>
                        </div>
                        <p>Options</p>
                        <div className='option'>
                            <input
                                type="checkbox"
                                id="option1"
                                name="option1"
                                value="option1"
                                checked={info.Préférence_1} // Coche la case si Préférence_1 est true
                            />
                            <label htmlFor="option1">Pluie</label><br />
                            <input
                                type="checkbox"
                                id="option2"
                                name="option2"
                                value="option2"
                                checked={info.Préférence_2} // Coche la case si Préférence_2 est true
                            />
                            <label htmlFor="option2">Vent</label><br />
                            <input
                                type="checkbox"
                                id="option3"
                                name="option3"
                                value="option3"
                                checked={info.Préférence_3} // Coche la case si Préférence_3 est true
                            />
                            <label htmlFor="option3">Humidité</label><br />
                        </div>
                    </div>
                </div>
                
                <Link
                    to="/">
                        <button type="submit">Home</button>
                </Link>
            </div>
        </>
    );
}

export default Dashboard;
