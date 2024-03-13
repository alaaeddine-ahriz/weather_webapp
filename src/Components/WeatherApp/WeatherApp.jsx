import React from 'react'
import './WeatherApp.css'

import search_icon from "../Assets/search.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import clear_sky from "../Assets/01d@2x.png";
import few_clouds from "../Assets/02d@2x.png";
import scattered_clouds from "../Assets/03d@2x.png";
import broken_clouds from "../Assets/04d@2x.png";
import shower_rain from "../Assets/09d@2x.png";
import rain from "../Assets/10d@2x.png";
import thunderstorm from "../Assets/11d@2x.png";
import snow from "../Assets/13d@2x.png";
import mist from "../Assets/50d@2x.png";

export const WeatherApp = () => {

    let api_key = "41ad9850d25b95de0ec5b350ddd03b16";

    const search = async ( ) => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value==="")
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;


        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-speed");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity;
        wind[0].innerHTML = data.wind.speed;
        temperature[0].innerHTML = data.main.temp;
        location[0].innerHTML = data.name;
    }

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Search'/>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <di className="weather-image">
            <img src={few_clouds} alt="" />
        </di>
        <div className="weather-temp">20°C</div>
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
        </div>
    </div>
  )
}