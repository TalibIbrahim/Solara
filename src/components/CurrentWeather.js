import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWeather, setWeatherUnits } from "../store";
import Tilt from "react-parallax-tilt";
import { TailSpin } from "react-loader-spinner";

import "./CurrentWeather.css";

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector((state) => state.currentWeather);
  const weatherUnits = useSelector((state) => state.weatherUnits);

  // state for storing the user's location and function for getting it
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const fetchWeather = useCallback(
    async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m&timezone=auto`
        );

        const data = await response.json();
        dispatch(setCurrentWeather(data.current));
        dispatch(setWeatherUnits(data.current_units));
        setIsLoading(false);
        console.log(data);
      } catch (err) {
        console.log("Error fetching data", err);
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  const getLocation = useCallback(() => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          console.log("Latitude is :", latitude);
          console.log("Longitude is :", longitude);
          fetchWeather(latitude, longitude);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [fetchWeather]);

  const reloadWeather = () => {
    setIsLoading(true);
    if (latitude && longitude) {
      fetchWeather(latitude, longitude);
    } else {
      getLocation();
    }
  };

  // useEffect hook for fetching the weather data as soon as the component mounts
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // Destructuring the current weather data and units
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

  // loading state:
  const loadingState = (
    <div className="text-center flex justify-center items-center mt-32">
      <TailSpin color="#fff" height={100} width={100} />
    </div>
  );

  //style for details card
  const cardStyle =
    "detail-card w-60 h-24 text-2xl text-center p-3 mx-5 my-2 flex justify-center drop-shadow-md shadow-md items-center rounded-xl cursor-pointer";

  return (
    <section className="main-bg h-screen">
      <div className=" pl-5 lg:pl-20 pt-10 flex lg:justify-start justify-between items-center ">
        <button
          className="h-16 w-48 bg-violet-800 rounded-xl text-center flex justify-center items-center text-white text-lg poppins-medium"
          onClick={getLocation}
        >
          Get Local Weather
        </button>
        <button
          onClick={reloadWeather}
          className="bg-violet-800 rounded-xl text-white h-16 w-16 mr-5 lg:ml-4 text-center flex justify-center items-center"
        >
          <span className="material-symbols-outlined text-3xl  ">refresh</span>
        </button>
      </div>
      {isLoading ? (
        loadingState
      ) : (
        <div className="text-white poppins-medium pt-10 p-20 flex items-start justify-around">
          <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7}>
            <div className="temperature-div cursor-pointer bg-sky-700 w-60 h-60 flex justify-center text-center items-center rounded-xl p-2 drop-shadow-md shadow-md">
              <div>
                <p className="text-8xl mt-7">{temperature}</p>
                <p className="text-5xl text-gray-300 mt-3">{temperatureUnit}</p>
              </div>
            </div>
          </Tilt>

          <div className="flex justify-around items-center flex-wrap w-3/4 mt-4">
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
              Feels Like: {feelsLike}
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
              Time of Day: {timeOfDay}
            </Tilt>
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
              {currentWeather.time && formatTimeTo12Hour(currentWeather.time)}
            </Tilt>
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
              Precipitation: {precipitation}
            </Tilt>
          </div>
        </div>
      )}
    </section>
  );
};

export default CurrentWeather;
