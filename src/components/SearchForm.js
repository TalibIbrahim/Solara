import React from "react";
import { useCallback, useRef } from "react";
import { setCurrentWeather, setWeatherUnits, setLoading } from "../store";

import { useDispatch } from "react-redux";
import "./SearchForm.css";

const SearchForm = () => {
  const dispatch = useDispatch();

  const cityInputRef = useRef();

  const fetchWeather = useCallback(
    async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m&timezone=auto`
        );

        const data = await response.json();
        dispatch(setCurrentWeather(data.current));
        dispatch(setWeatherUnits(data.current_units));

        console.log(data);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    },
    [dispatch]
  );

  const formSubmitHandler = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();
    const enteredCity = cityInputRef.current.value.trim();

    if (enteredCity === "") {
      console.error("City input is empty. Please enter a city name.");
      dispatch(setLoading(false));
      return;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        enteredCity
      )}&format=json&limit=1`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        console.log("Longitude and Latitude are: ", data[0].lon, data[0].lat);

        const longitude = data[0].lon;
        const latitude = data[0].lat;
        await fetchWeather(latitude, longitude);
      } else {
        console.log(
          "No data found for the city. Try searching for the correct city name."
        );
        dispatch(setLoading(false));
      }
    } catch (err) {
      console.log("Error fetching data from Nominatim", err);
    } finally {
      cityInputRef.current.value = "";
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 ">
      <form onSubmit={formSubmitHandler}>
        <input
          className="input-box focus:outline-none w-96  p-3 rounded-xl  text-2xl text-white poppins-regular"
          ref={cityInputRef}
          type="text"
          placeholder="Search for a city"
        />
        <button
          className="h-14 text-white text-xl poppins-medium px-5 ml-3 bg-violet-800 active:bg-violet-900 ease-in-out duration-300 rounded-xl text-center"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
