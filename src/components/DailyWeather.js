import React from "react";
import { useSelector } from "react-redux";
import { weatherCodeMapping } from "../utility/weatherUtility";
import "./DailyWeather.css";

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
    <div className="flex items-center justify-center w-full mb-28">
      <div className="flex items-center justify-center daily-weather-card  w-11/12 flex-col flex-nowrap text-white text-center text-xl rounded-xl">
        {time.map((date, index) => {
          const weatherCode = weather_code[index];
          const weatherIcon = weatherCodeMapping[weatherCode];
          const maxTemp = Math.round(temperature_2m_max[index]);
          const minTemp = Math.round(temperature_2m_min[index]);

          return (
            <div
              key={index}
              className=" flex w-full justify-around items-center p-5   "
            >
              <p className="w-32">{date}</p>
              <div className="flex items-center justify-center w-11 h-10">
                <img src={weatherIcon} alt="weather icon" />{" "}
              </div>
              <p className="w-10 text-start">{minTemp}</p>
              <p className="w-10 text-start">{maxTemp}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyWeather;
