import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWeather, setWeatherUnits } from "../store";
import Tilt from "react-parallax-tilt";

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector((state) => state.currentWeather);
  const weatherUnits = useSelector((state) => state.weatherUnits);
  // useEffect hook for fetching the weather data as soon as the component mounts
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=31.558&longitude=74.3507&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m&timezone=auto"
        );

        const data = await response.json();
        console.log(data);

        dispatch(setCurrentWeather(data.current)); // curr temp etc is under 'current'
        dispatch(setWeatherUnits(data.current_units)); // units are under 'current_units'
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };

    fetchWeather();
  }, [dispatch]);

  const temperature = currentWeather.temperature_2m;
  const temperatureUnit = weatherUnits.temperature_2m;
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

  const cardStyle =
    "bg-sky-700 w-60 h-24 text-2xl text-center p-3 mx-5 my-2 flex justify-center drop-shadow-md shadow-md items-center rounded-xl";

  return (
    <div className="bg-neutral-700 h-screen">
      <div className="text-white poppins-medium p-20 flex items-start justify-around">
        <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6}>
          <div className="temperature-div bg-sky-700 w-60 h-60 flex justify-center text-center items-center rounded-xl p-2 drop-shadow-md shadow-md">
            <p>
              <div className="text-8xl mt-7">{temperature}</div>
              <div className="text-5xl text-gray-300 mt-3">
                {temperatureUnit}
              </div>
            </p>
          </div>
        </Tilt>

        <div className="flex justify-around items-center flex-wrap w-3/4 mt-4">
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className={cardStyle}>
            Feels Like: {feelsLike}
          </Tilt>
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className={cardStyle}>
            Humidity: {humidity}
          </Tilt>
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className={cardStyle}>
            Wind Speed: {windSpeed}
          </Tilt>
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className={cardStyle}>
            Wind Direction: {windDirection}
          </Tilt>
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className={cardStyle}>
            Rain: {rain}
          </Tilt>
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className={cardStyle}>
            Time of Day: {timeOfDay}
          </Tilt>
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className={cardStyle}>
            {currentWeather.time && formatTimeTo12Hour(currentWeather.time)}
          </Tilt>
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className={cardStyle}>
            Precipitation: {precipitation}
          </Tilt>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
