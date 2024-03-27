import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"
import axios from 'axios'

function Dashboard() {
    const [suc, setSuc ] = useState()
    const [info, setInfo] = useState([]);
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(()=> {
        axios.get('http://localhost:4000/dashboard')
        .then(res => {
            console.log("dashboad: " + res.data);
            if(res.data === "Success") {
                setSuc("Successded OK")
            } else {
                navigate('/')
            }
        }).catch(err => console.log(err))
    }, [])
    useEffect(()=> {
        axios.get('http://localhost:4000/get-nom/0769611797')
        .then(res => {
            console.log("dashboad: " + res.data["nom"]);
            setInfo(res.data);
        }).catch(err => console.log(err))
    }, [])


    return ( 
        <>
        <div>
            <h2>dashboard</h2>
            <p>{suc}</p>
        </div>
        
        <div className='dashboard'>
                <div className='profil'>
                    <div className='photo'>
                    </div>
                    <div className='description'>
                    <p>{info["nom"] + " " + info["Prenom"]}</p>
                    <p>{info["user"]}</p>
                    </div>
                    <div className='preferences'>
                    <p>{info["Ville_par_défaut"]}</p>
                        <div className='option'>
                            option
                        </div>
                    </div>
                </div>
        </div>
            </>

     );
}

export default Dashboard;
