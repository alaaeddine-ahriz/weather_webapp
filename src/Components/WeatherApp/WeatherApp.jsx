import React, { useState, useEffect } from 'react';
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
import clearSkyVideo from "../Assets/clear_sky.mp4";
import thunderstormVideo from "../Assets/thunderstorm.mp4"

export const center = {
    lat: 7.2905715,
    lng: 80.6337262,
};

export const WeatherApp = () => {
    // const [wicon, setWicon] = useState(clear_sky);
    const [backgroundVideo, setBackgroundVideo] = useState(clearSkyVideo);
    const [center, setCenter] = useState({
      lat: 7.2905715, // Default latitude
      lng: 80.6337262, // Default longitude
    });
    const [weatherData, setWeatherData] = useState({
      humidity: '-%',
      windSpeed: '-km/h',
      temp: '-°',
      feelsLike: '-°',
      location: 'Villeurbanne',
    });

    const api_key = "41ad9850d25b95de0ec5b350ddd03b16";
  
    const fetchWeatherAndGeocodeData = async (city) => {
      try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`);
        if (!response.ok) throw new Error("Weather data fetch failed");
        let data = await response.json();

        setWeatherData({
          humidity: `${Math.floor(data.main.humidity)}%`,
          windSpeed: `${Math.floor(data.wind.speed)} km/h`,
          temp: `${Math.floor(data.main.temp)}°`,
          feelsLike: `${Math.floor(data.main.feels_like)}°`,
          location: data.name,
        });
        
        // const weatherIconMap = {
        const weatherVideoMap = {
          "01d": clearSkyVideo,
          "02d": thunderstormVideo,
          "03d": thunderstormVideo,
          "04d": thunderstormVideo,
          "09d": thunderstormVideo,
          "10d": thunderstormVideo,
          "11d": thunderstormVideo,
          "13d": thunderstormVideo,
          "50d": thunderstormVideo,
        };
        // setWicon(weatherIconMap[data.weather[0].icon] || clear_sky);
        setBackgroundVideo(weatherVideoMap[data.weather[0].icon] || thunderstormVideo);

        const geoResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyAW0-OQUNUuQHQ-TvSuo4v4GjRKmHE1eps`);
        const geoData = await geoResponse.json();
        
        if (geoData.results && geoData.results.length > 0) {
          const location = geoData.results[0].geometry.location;
          setCenter({ lat: location.lat, lng: location.lng });
        } else {
          console.error('No results found for the specified city.');
        }
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    useEffect(() => {
      fetchWeatherAndGeocodeData('Villeurbanne');
    }, []);

    const search = async () => {
      const inputElement = document.querySelector(".cityInput");
      const city = inputElement.value;

      if (city === "") {
        alert("Please enter a city name.");
        return;
      }

      await fetchWeatherAndGeocodeData(city); // Wait for the async operation to complete
    };

    return (
    <div className='weatherapp-container'>
        <video autoPlay loop muted style={{
          position: "absolute",
          width: "100%",
          left: "0",
          top: "0",
          height: "100%",
          objectFit: "cover",
          zIndex: "-1"
        }} key={backgroundVideo}>
          <source src={backgroundVideo} type="video/mp4"/>
        </video>
       {/* <div className="header">
            <Header/>
        </div> */}
      <div className="weatherapp-top-bar">
        <input type="text" className="cityInput" placeholder='Search'/>
        <div className="weatherapp-search-icon" onClick={search}>
          <img src={search_icon} alt="Search" />
        </div>
      </div>
      {/* <div className="weatherapp-weather-image">
        <img src={wicon} alt="Weather" />
      </div> */}
      <div className="weatherapp-weather-temp">{weatherData.temp}</div>
      <div className="weatherapp-weather-location">{weatherData.location}</div>
      <div className="weatherapp-data-container">
        <div className="weatherapp-element">
          {/* <img src={humidity_icon} alt="Humidity" className='icon'/> */}
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidité</div>
          </div>
        </div>
        <div className="weatherapp-element">
          {/* <img src={wind_icon} alt="Wind Speed" className='icon'/> */}
          <div className="data">
            <div className="wind-speed">{weatherData.windSpeed}</div>
            <div className="text">Vent</div>
          </div>
        </div>
        <div className="weatherapp-element">
          {/* <img src={wind_icon} alt="Feels Like" className='icon'/> */}
          <div className="data">
            <div className="feels-like">{weatherData.feelsLike}</div>
            <div className="text">Ressenti</div>
          </div>
        </div>
      </div>
      <div className="weatherapp-map-container">
        <MapComponent center={center}/>
      </div>
    </div>
  );
};
