import React from "react";
import { useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setCity,
  setCurrentWeather,
  setWeatherUnits,
  setCoordinates,
  setDailyWeather,
} from "../store";

import { getCity } from "../utility/weatherUtility";

const UtilityButtons = () => {
  const [longitudeState, setLongitude] = useState(null);
  const [latitudeState, setLatitude] = useState(null);

  const dispatch = useDispatch();

  const longitude = useSelector((state) => state.coordinates.lon);
  const latitude = useSelector((state) => state.coordinates.lat);

  // RELOAD WEATHER FUNCTION
  const reloadWeather = () => {
    dispatch(setLoading(true));
    if (latitude && longitude) {
      fetchWeather(latitude, longitude);
    } else {
      console.log("No location data available");
      getLocation();
    }
  };

  const fetchWeather = useCallback(
    async (latitude, longitude) => {
      try {
        await getCity(latitude, longitude, dispatch, setCity);
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto`
        );

        const data = await response.json();
        dispatch(setCurrentWeather(data.current));
        dispatch(setDailyWeather(data.daily));

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

  // GET LOCATION FUNCTION
  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);

          dispatch(setCoordinates({ lon: longitudeState, lat: latitudeState }));
          fetchWeather(latitude, longitude);
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
  }, [fetchWeather, dispatch, latitudeState, longitudeState]);

  return (
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
  );
};

export default UtilityButtons;
