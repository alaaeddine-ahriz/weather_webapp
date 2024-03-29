import React from "react";
import "./WeatherForecastList.css"; // Ensure the CSS file name matches

function WeatherForecastList({ forecasts }) {
  if (!forecasts || !forecasts.data) {
    // You could return a loading indicator or null here
    return <div className="Loading">Loading...</div>;
  }
  // Helper function to format date
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset today's time to 00:00 for accurate comparison

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else {
      return date.toLocaleDateString("en-US", { weekday: "long" }); // Change 'en-US' as needed
    }
  };

  const forecastItems =
    forecasts.data.map((forecast, index) => (
      <li key={index} className="forecast-item">
        <div className="forecast-date-desc">
          <div className="forecast-date">{formatDate(forecast.datetime)}</div>
          <div className="forecast-description">
            {forecast.weather.description}
          </div>
        </div>
        <div className="forecast-temps">
          <span className="temp-min">{forecast.low_temp}°</span>
          <span className="temp-max">{forecast.high_temp}°C</span>
        </div>
      </li>
    )) || "Loading...";

  return (
    <div className="forecast-container">
      <ul className="forecast-list">{forecastItems}</ul>
    </div>
  );
}

export default WeatherForecastList;
