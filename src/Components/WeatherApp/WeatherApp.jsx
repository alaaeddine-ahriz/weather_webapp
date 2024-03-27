import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import { Link } from "react-router-dom";
import WeatherForecastList from "./ForecastComponent";
import { Header } from "./HeaderComponent";
import "./WeatherApp.css";

// Importing images and icons
// import search_icon from "../Assets/search.png";
// import wind_icon from "../Assets/wind.png";
// import humidity_icon from "../Assets/humidity.png";
// import clear_sky from "../Assets/01d.svg";

// import clearSkyVideo from "../Assets/clear_sky.mp4";
// import thunderstormVideo from "../Assets/thunderstorm.mp4";
// import fewCloudsVideo from "../Assets/few_clouds.mp4";
// import snowVideo from "../Assets/snow.mp4";
// import mistVideo from "../Assets/mist.mp4";

import profile_image from "../Assets/profile_1.png";
import { useCookies } from "react-cookie";
import clear_sky from "../Assets/clear_sky_img1.jpg";
import few_clouds from "../Assets/few_clouds.jpg";
import scattered_clouds from "../Assets/scattered_clouds.jpg";
import broken_clouds from "../Assets/broken_clouds.jpg";
import shower_rain from "../Assets/shower_rain.jpg";
import rain from "../Assets/10d.svg";
import thunderstorm from "../Assets/thunderstorm.jpg";
import snow from "../Assets/snow.jpg";
import mist from "../Assets/mist.jpg";

export const center = {
  lat: 7.2905715,
  lng: 80.6337262,
};

export const WeatherApp = () => {
  const [cookies] = useCookies(["userData"]);
  const userData = cookies.userData;
  const [backgroundVideo, setBackgroundVideo] = useState(clear_sky);
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
  const [Forecasts, setForecasts] = useState({}); // État local pour stocker les prévisions météo

  const api_key_current = "41ad9850d25b95de0ec5b350ddd03b16";
  const api_key_forecast = "0007009a972248f19225fb70d78538b3";

  const fetchWeatherAndGeocodeData = async (city) => {
    try {
      // Fetching current weather data
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key_current}`,
      );
      if (!response.ok) throw new Error("Weather data fetch failed");

      let data = await response.json();

      // Setting current weather data
      setWeatherData({
        humidity: `${Math.floor(data.main.humidity)}%`,
        windSpeed: `${Math.floor(data.wind.speed)} km/h`,
        temp: `${Math.floor(data.main.temp)}°`,
        feelsLike: `${Math.floor(data.main.feels_like)}°`,
        location: data.name,
        description: data.weather[0].description,
        tempMinMax: `H:${Math.floor(data.main.temp_max)}° L:${Math.floor(data.main.temp_min)}°`,
      });

      // Setting background video based on current weather
      const weatherVideoMap = {
        "01d": clear_sky,
        "02d": few_clouds,
        "03d": scattered_clouds,
        "04d": broken_clouds,
        "09d": shower_rain,
        "10d": shower_rain,
        "11d": thunderstorm,
        "13d": snow,
        "50d": mist,
      };
      setBackgroundVideo(weatherVideoMap[data.weather[0].icon] || clear_sky);
    } catch (error) {
      console.error("Failed to fetch current weather data:", error);
    }

    try {
      // Fetching forecast data
      let Forecastsda = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${api_key_forecast}`,
      );
      if (!Forecastsda.ok) throw new Error("Forecast data fetch failed");

      let forecastsData = await Forecastsda.json();
      setForecasts(forecastsData); // Setting forecast data
    } catch (error) {
      console.error("Failed to fetch forecast data:", error);
      // Optionally, handle forecast fetch failure (e.g., by setting a default state or showing a message)
    }

    try {
      // Fetching geocode data
      const geoResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyAW0-OQUNUuQHQ-TvSuo4v4GjRKmHE1eps`,
      );
      if (!geoResponse.ok) throw new Error("Geocode fetch failed");

      const geoData = await geoResponse.json();

      if (geoData.results && geoData.results.length > 0) {
        const location = geoData.results[0].geometry.location;
        setCenter({ lat: location.lat, lng: location.lng });
      } else {
        console.error("No results found for the specified city.");
      }
    } catch (error) {
      console.error("Failed to fetch geocode data:", error);
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
          <Link to={cookies.user ? "/dashboard" : "/login"}>
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
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="weatherapp-element">
          <div className="data">
            <div className="wind-speed">{weatherData.windSpeed}</div>
            <div className="text">Wind</div>
          </div>
        </div>
        <div className="weatherapp-element">
          <div className="data">
            <div className="feels-like">{weatherData.feelsLike}</div>
            <div className="text">Feels Like</div>
          </div>
        </div>
      </div>
      <div className="large-components">
        <div className="weatherapp-map-container">
          <MapComponent center={center} />
        </div>
        <div className="WeatherForecastList">
          <WeatherForecastList forecasts={Forecasts} />
        </div>
      </div>
    </div>
  );
};
