import React from "react";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store";
import { fetchWeather } from "../utility/weatherUtility.js";
import Tilt from "react-parallax-tilt";
import { TailSpin } from "react-loader-spinner";

import "./CurrentWeather.css";
import SearchForm from "./SearchForm";
import CityCard from "./CityCard";
import WeatherDetails from "./WeatherDetails";
import UtilityButtons from "./UtilityButtons";

const CurrentWeather = () => {
  const dispatch = useDispatch();

  const { currentWeather, weatherUnits, isLoading } = useSelector((state) => ({
    currentWeather: state.currentWeather,
    weatherUnits: state.weatherUnits,
    isLoading: state.loading,
  }));

  // state for storing the user's location and function for getting it

  const fetchWeatherData = useCallback(
    (latitude, longitude) => {
      fetchWeather(latitude, longitude, dispatch);
    },
    [dispatch]
  );

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          fetchWeatherData(latitude, longitude, dispatch);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      dispatch(setLoading(false));
    }
  }, [fetchWeatherData, dispatch]);

  // useEffect hook for fetching the weather data as soon as the component mounts
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // Destructuring the current weather data and units
  const temperature = currentWeather.temperature_2m;
  const temperatureUnit = weatherUnits.temperature_2m;

  // loading state:
  const loadingState = (
    <div className="text-center flex justify-center items-center mt-32">
      <TailSpin color="#fff" height={100} width={100} />
    </div>
  );

  return (
    <section className="mb-10 lg:mb-0">
      <CityCard />
      <SearchForm />
      <UtilityButtons />

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
          <WeatherDetails />
        </div>
      )}
    </section>
  );
};

export default CurrentWeather;
