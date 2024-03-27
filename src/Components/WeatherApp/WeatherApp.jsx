import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import { Link } from "react-router-dom";

import { Header } from "./HeaderComponent";
import "./WeatherApp.css";

// Importing images and icons
// import search_icon from "../Assets/search.png";
// import wind_icon from "../Assets/wind.png";
// import humidity_icon from "../Assets/humidity.png";
// import clear_sky from "../Assets/01d.svg";
// import few_clouds from "../Assets/02d.svg";
// import scattered_clouds from "../Assets/03d.svg";
// import broken_clouds from "../Assets/04d.svg";
// import shower_rain from "../Assets/09d.svg";
// import rain from "../Assets/10d.svg";
// import thunderstorm from "../Assets/11d.svg";
// import snow from "../Assets/13d.svg";
// import mist from "../Assets/50d.svg";
// import clearSkyVideo from "../Assets/clear_sky.mp4";
// import thunderstormVideo from "../Assets/thunderstorm.mp4";
// import fewCloudsVideo from "../Assets/few_clouds.mp4";
// import snowVideo from "../Assets/snow.mp4";
// import mistVideo from "../Assets/mist.mp4";

import profile_image from "../Assets/profile_1.png";

import clearSkyImage from "../Assets/clear_sky_img1.jpg";

export const center = {
  lat: 7.2905715,
  lng: 80.6337262,
};

export const WeatherApp = () => {
  const [backgroundVideo, setBackgroundVideo] = useState(clearSkyImage);
  const [center, setCenter] = useState({
    lat: 7.2905715,
    lng: 80.6337262,
  });
  const [weatherData, setWeatherData] = useState({
    humidity: "-%",
    windSpeed: "-km/h",
    temp: "-°",
    feelsLike: "-°",
    location: "Villeurbanne",
    description: "Overcast clouds",
    tempMinMax: "H:-° L:-°",
  });

  const api_key = "41ad9850d25b95de0ec5b350ddd03b16";

  const fetchWeatherAndGeocodeData = async (city) => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`,
      );
      if (!response.ok) throw new Error("Weather data fetch failed");
      let data = await response.json();

      setWeatherData({
        humidity: `${Math.floor(data.main.humidity)}%`,
        windSpeed: `${Math.floor(data.wind.speed)} km/h`,
        temp: `${Math.floor(data.main.temp)}°`,
        feelsLike: `${Math.floor(data.main.feels_like)}°`,
        location: data.name,
        description: data.weather[0].description,
        tempMinMax: `H:${Math.floor(data.main.temp_max)}° L:${Math.floor(data.main.temp_min)}°`,
      });

      const weatherVideoMap = {
        "01d": clearSkyImage,
        "02d": clearSkyImage,
        "03d": clearSkyImage,
        "04d": clearSkyImage,
        "09d": clearSkyImage,
        "10d": clearSkyImage,
        "11d": clearSkyImage,
        "13d": clearSkyImage,
        "50d": clearSkyImage,
      };
      setBackgroundVideo(
        weatherVideoMap[data.weather[0].icon] || clearSkyImage,
      );

      const geoResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyAW0-OQUNUuQHQ-TvSuo4v4GjRKmHE1eps`,
      );
      const geoData = await geoResponse.json();

      if (geoData.results && geoData.results.length > 0) {
        const location = geoData.results[0].geometry.location;
        setCenter({ lat: location.lat, lng: location.lng });
      } else {
        console.error("No results found for the specified city.");
      }
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherAndGeocodeData("Villeurbanne");
  }, []);

  const search = async () => {
    const inputElement = document.querySelector(".cityInput");
    const city = inputElement.value;

    /*
      if (city === "") {
        alert("Please enter a city name.");
        return;
      }
      */

    await fetchWeatherAndGeocodeData(city);
  };

  return (
    <div className="weatherapp-container">
      <img
        src={backgroundVideo}
        alt="Background"
        style={{
          position: "absolute",
          width: "100%",
          left: "0",
          top: "0",
          height: "100%",
          objectFit: "cover",
          zIndex: "-1",
        }}
        key={backgroundVideo}
      />
      {/* <div className="header">
            <Header/>
        </div> */}
      <div className="weatherapp-top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Ville"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              search();
              e.preventDefault();
            }
          }}
        />
        <div className="weatherapp-account">
          <Link to="/Login">
            <img
              src={profile_image}
              alt="Profile"
              className="weatherapp-account-image"
            />
          </Link>
        </div>
      </div>
      <div className="weatherapp-weather-location">{weatherData.location}</div>
      <div className="weatherapp-weather-temp">{weatherData.temp}</div>
      <div className="weatherapp-weather-description">
        {weatherData.description}
      </div>
      <div className="weatherapp-weather-tempMinMax">
        {weatherData.tempMinMax}
      </div>
      <div className="weatherapp-data-container">
        <div className="weatherapp-element">
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidité</div>
          </div>
        </div>
        <div className="weatherapp-element">
          <div className="data">
            <div className="wind-speed">{weatherData.windSpeed}</div>
            <div className="text">Vent</div>
          </div>
        </div>
        <div className="weatherapp-element">
          <div className="data">
            <div className="feels-like">{weatherData.feelsLike}</div>
            <div className="text">Ressenti</div>
          </div>
        </div>
      </div>
      <div className="weatherapp-map-container">
        <MapComponent center={center} />
      </div>
    </div>
  );
};
