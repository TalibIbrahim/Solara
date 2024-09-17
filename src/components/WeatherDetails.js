import React from "react";
import Tilt from "react-parallax-tilt";
import { useSelector } from "react-redux";

const WeatherDetails = () => {
  // currentWeather taken from the store

  const { currentWeather, weatherUnits } = useSelector((state) => ({
    currentWeather: state.currentWeather,
    weatherUnits: state.weatherUnits,
  }));

  // card styles for the weather details
  const cardStyle =
    "detail-card w-52 h-24  lg:w-60 lg:h-24 text-xl lg:text-2xl  text-center p-3 mx-5 my-2 flex justify-center drop-shadow-md shadow-md items-center rounded-xl cursor-pointer";

  // Destructuring the current weather data and units
  const feelsLike = `${currentWeather.apparent_temperature} ${weatherUnits.temperature_2m}`;
  const windSpeed = `${currentWeather.wind_speed_10m} ${weatherUnits.wind_speed_10m}`;
  const windDirection = `${currentWeather.wind_direction_10m}  ${weatherUnits.wind_direction_10m}`;
  const humidity = `${currentWeather.relative_humidity_2m} ${weatherUnits.relative_humidity_2m}`;
  const rain = `${currentWeather.rain} ${weatherUnits.rain}`;
  const timeOfDay = currentWeather.is_day ? "Day" : "Night";
  const precipitation = `${currentWeather.precipitation} ${weatherUnits.precipitation}`;

  // Function to format time to 12-hour format
  const formatTimeTo12Hour = (timeString) => {
    const date = new Date(timeString);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString([], options);
  };

  return (
    <div className="card-container lg:w-3/4 lg:mt-4">
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        {currentWeather.time && formatTimeTo12Hour(currentWeather.time)}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        Time of Day: {timeOfDay}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        Humidity: {humidity}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        Wind Speed: {windSpeed}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        Wind Direction: {windDirection}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        Rain: {rain}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        Feels Like: {feelsLike}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        Precipitation: {precipitation}
      </Tilt>
    </div>
  );
};

export default WeatherDetails;
