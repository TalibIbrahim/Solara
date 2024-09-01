import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWeather, setWeatherUnits, setLoading } from "../store";
import Tilt from "react-parallax-tilt";
import { TailSpin } from "react-loader-spinner";

import "./CurrentWeather.css";
import SearchForm from "./SearchForm";

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector((state) => state.currentWeather);
  const weatherUnits = useSelector((state) => state.weatherUnits);
  const isLoading = useSelector((state) => state.loading);

  // state for storing the user's location and function for getting it
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const fetchWeather = useCallback(
    async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m&timezone=auto`
        );

        const data = await response.json();
        dispatch(setCurrentWeather(data.current));
        dispatch(setWeatherUnits(data.current_units));
        dispatch(setLoading(false));
        console.log(data);
      } catch (err) {
        console.log("Error fetching data", err);
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const getLocation = useCallback(() => {
    dispatch(setLoading(true));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          console.log("Latitude is :", latitude);
          console.log("Longitude is :", longitude);
          fetchWeather(latitude, longitude);
          dispatch(setLoading(false));
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [fetchWeather, dispatch]);

  const reloadWeather = () => {
    dispatch(setLoading(true));
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
  const cardStyle =
    "detail-card w-52 h-24  lg:w-60 lg:h-24 text-xl lg:text-2xl  text-center p-3 mx-5 my-2 flex justify-center drop-shadow-md shadow-md items-center rounded-xl cursor-pointer";

  return (
    <section className="pb-10">
      <SearchForm />
      <div className="pl-5 lg:pl-20 pt-10 flex justify-between items-center">
        <div className="w-92 flex justify-start items-center">
          <button
            className="h-16 w-48 bg-violet-800 active:bg-violet-900 ease-in-out duration-300 rounded-xl text-center flex justify-center items-center text-white text-lg poppins-medium"
            onClick={getLocation}
          >
            Get Local Weather
          </button>
          <button
            onClick={reloadWeather}
            className="bg-violet-800 active:bg-violet-900 ease-in-out duration-300 rounded-xl text-white h-16 w-16 mr-5 ml-4 text-center flex justify-center items-center"
          >
            <span className="material-symbols-outlined text-3xl">refresh</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        loadingState
      ) : (
        <div className="text-white poppins-medium pt-5 lg:p-10  xl:p-16 flex flex-col lg:flex-row items-center lg:items-start justify-around">
          <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7}>
            <div className="temperature-div cursor-pointer w-56 h-56 mt-6 lg:w-60 lg:h-60 flex justify-center text-center items-center rounded-xl drop-shadow-md shadow-md mb-6 lg:mb-0">
              <div className="flex items-center flex-col lg:items-center">
                <p className="text-8xl mt-4 ">{temperature}</p>
                <p className="text-5xl text-gray-300 mb-4 lg:mt-1">
                  {temperatureUnit}
                </p>
              </div>
            </div>
          </Tilt>
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
        </div>
      )}
    </section>
  );
};

export default CurrentWeather;
