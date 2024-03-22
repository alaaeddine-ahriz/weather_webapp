import React, { useState } from 'react'
import { MapComponent } from "./MapComponent.jsx"
import './WeatherApp.css'

import search_icon from "../Assets/search.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import clear_sky from "../Assets/01d.svg";
import few_clouds from "../Assets/02d.svg";
import scattered_clouds from "../Assets/03d.svg";
import broken_clouds from "../Assets/04d.svg";
import shower_rain from "../Assets/09d.svg";
import rain from "../Assets/10d.svg";
import thunderstorm from "../Assets/11d.svg";
import snow from "../Assets/13d.svg";
import mist from "../Assets/50d.svg";

var center = {
    lat: 7.2905715, // default latitude
    lng: 80.6337262, // default longitude
  };
  
export { center};

export const WeatherApp = () => {

    const position = [51.505, -0.09]

    let api_key = "41ad9850d25b95de0ec5b350ddd03b16";

    const [wicon,setWicon] = useState(clear_sky);
    const [coords, setCoords] = useState([90, 90]);

    const search = async ( ) => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value==="")
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${element[0].value}&key=AIzaSyAW0-OQUNUuQHQ-TvSuo4v4GjRKmHE1eps`)
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            center = {lat: location.lat, lng: location.lng};
          } else {
            console.error('Aucun résultat trouvé pour la ville spécifiée.');
          }
        })
        .catch(error => {
          console.error('Une erreur s\'est produite lors de la récupération des coordonnées :', error);
        });
        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-speed");
        const feels_like = document.getElementsByClassName("feels-like")
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = Math.floor(data.main.humidity)+" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+"°";
        feels_like[0].innerHTML = Math.floor(data.main.feels_like)+"°";
        location[0].innerHTML = data.name;

        setCoords([data.coord.lat, data.coord.lon]);

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
        {
            setWicon(clear_sky);
        }
        
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
        {
            setWicon(few_clouds);
        }

        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
        {
            setWicon(scattered_clouds);
        }

        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
        {
            setWicon(broken_clouds);
        }

        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
        {
            setWicon(shower_rain);
        }

        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
        {
            setWicon(rain);
        }

        else if(data.weather[0].icon==="11d" || data.weather[0].icon==="11n")
        {
            setWicon(thunderstorm);
        }

        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
        {
            setWicon(snow);
        }

        else if(data.weather[0].icon==="50d" || data.weather[0].icon==="50n")
        {
            setWicon(mist);
        }

        else
        {
            setWicon(clear_sky);
        }
    }

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Search'/>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">20°</div>
        <div className="weather-location">Villeurbanne</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className='icon'/>
                <div className="data">
                    <div className="humidity-percent">50%</div>
                    <div className="text">Humidité</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className='icon'/>
                <div className="data">
                    <div className="wind-speed">15 km/h</div>
                    <div className="text">Vents</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className='icon'/>
                <div className="data">
                    <div className="feels-like">20°</div>
                    <div className="text">Ressenti</div>
                </div>
            </div>
            
        </div>
        <div className="map-container">
            <MapComponent/>
        </div>
    </div>
  )
}
