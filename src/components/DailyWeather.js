import React from "react";
import { useSelector } from "react-redux";
import { weatherCodeMapping } from "../utility/weatherUtility";

const DailyWeather = () => {
  const dailyWeather = useSelector((state) => state.dailyWeather);
  console.log(dailyWeather);

  // destructuring the daily weather data
  const {
    time = [],
    weather_code = [],
    temperature_2m_max = [],
    temperature_2m_min = [],
  } = dailyWeather;

  return (
    <div>
      {time.map((date, index) => {
        const weatherCode = weather_code[index];
        const weatherDescription = weatherCodeMapping[weatherCode];
        const maxTemp = temperature_2m_max[index];
        const minTemp = temperature_2m_min[index];

        return (
          <div key={index} className="daily-weather-card">
            <p>Date: {date}</p>
            <p>Weather: {weatherDescription}</p>
            <p>Max Temp: {maxTemp}</p>
            <p>Min Temp: {minTemp}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DailyWeather;
