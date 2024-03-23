import React, { useState } from 'react';
import MapComponent from "./MapComponent";
import { Header } from "./HeaderComponent";
import './WeatherApp.css';

// Importing images and icons
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

export const center = {
    lat: 7.2905715,
    lng: 80.6337262,
};

export const WeatherApp = () => {
  const [wicon, setWicon] = useState(clear_sky);
  const [center, setCenter] = useState({
    lat: 7.2905715, // Default latitude
    lng: 80.6337262, // Default longitude
  });
  const [weatherData, setWeatherData] = useState({
    humidity: '-%',
    windSpeed: '-km/h',
    temp: '-°',
    feelsLike: '-°',
    location: 'Villeurbanne', // Default location
  });

  const api_key = "41ad9850d25b95de0ec5b350ddd03b16";

  const search = async () => {
    const inputElement = document.querySelector(".cityInput");
    const city = inputElement.value;

    if (city === "") {
      alert("Please enter a city name.");
      return;
    }

    try {
      // Fetch weather data
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`);
      if (!response.ok) throw new Error("Weather data fetch failed");
      let data = await response.json();

      // Update state with the fetched data
      setWeatherData({
        humidity: Math.floor(data.main.humidity) + "%",
        windSpeed: Math.floor(data.wind.speed) + " km/h",
        temp: Math.floor(data.main.temp) + "°",
        feelsLike: Math.floor(data.main.feels_like) + "°",
        location: data.name,
      });

      // Update the weather icon based on the weather condition
      const weatherIconMap = {
        "01d": clear_sky,
        "02d": few_clouds,
        "03d": scattered_clouds,
        "04d": broken_clouds,
        "09d": shower_rain,
        "10d": rain,
        "11d": thunderstorm,
        "13d": snow,
        "50d": mist,
      };
      setWicon(weatherIconMap[data.weather[0].icon] || clear_sky);

      // Fetch geocode data
      const geoResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyAW0-OQUNUuQHQ-TvSuo4v4GjRKmHE1eps`);
      const geoData = await geoResponse.json();
      
      if (geoData.results && geoData.results.length > 0) {
        const location = geoData.results[0].geometry.location;
        setCenter({ lat: location.lat, lng: location.lng }); // Update center state
      } else {
        console.error('No results found for the specified city.');
      }

    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  return (
    <div className='weatherapp-container'>
       <div className="header">
            <Header/>
        </div>
      <div className="weatherapp-top-bar">
        <input type="text" className="cityInput" placeholder='Search'/>
        <div className="weatherapp-search-icon" onClick={search}>
          <img src={search_icon} alt="Search" />
        </div>
      </div>
      <div className="weatherapp-weather-image">
        <img src={wicon} alt="Weather" />
      </div>
      <div className="weatherapp-weather-temp">{weatherData.temp}</div>
      <div className="weatherapp-weather-location">{weatherData.location}</div>
      <div className="weatherapp-data-container">
        <div className="weatherapp-element">
          <img src={humidity_icon} alt="Humidity" className='icon'/>
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="weatherapp-element">
          <img src={wind_icon} alt="Wind Speed" className='icon'/>
          <div className="data">
            <div className="wind-speed">{weatherData.windSpeed}</div>
            <div className="text">Wind</div>
          </div>
        </div>
        <div className="weatherapp-element">
          <img src={wind_icon} alt="Feels Like" className='icon'/>
          <div className="data">
            <div className="feels-like">{weatherData.feelsLike}</div>
            <div className="text">Feels Like</div>
          </div>
        </div>
      </div>
      <div className="weatherapp-map-container">
        <MapComponent center={center}/>
      </div>
    </div>
  );
};
