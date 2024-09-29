import {
  setCity,
  setCurrentWeather,
  setWeatherUnits,
  setLoading,
  setDailyWeather,
} from "../store";

import clearSky from "../components/assets/clear-sky.png";
import partlyCloudy from "../components/assets/partly-cloudy.png";
import fog from "../components/assets/fog.png";
import showers from "../components/assets/showers.png";
import freezingRain from "../components/assets/freezing-rain.png";
import snow from "../components/assets/snow.png";
import rain from "../components/assets/rain.png";
import thunderstorm from "../components/assets/thunderstorm.png";

export const extractCityAndCountry = (displayName) => {
  const parts = displayName.split(",").map((part) => part.trim());

  const city = parts[0];
  const country = parts[parts.length - 1];

  return `${city}, ${country}`;
};

export const getCity = async (latitude, longitude, dispatch, setCity) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  const response = await fetch(url);
  const data = await response.json();
  const simplifiedAddress = extractCityAndCountry(data.display_name);
  dispatch(setCity(simplifiedAddress));
};

export const fetchWeather = async (latitude, longitude, dispatch) => {
  try {
    await getCity(latitude, longitude, dispatch, setCity);
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto`
    );

    const data = await response.json();
    dispatch(setCurrentWeather(data.current));
    dispatch(setWeatherUnits(data.current_units));
    dispatch(setDailyWeather(data.daily));
    dispatch(setLoading(false));
  } catch (err) {
    console.log("Error fetching data", err);
    dispatch(setLoading(false));
  }
};

export const weatherCodeMapping = {
  0: clearSky,
  1: partlyCloudy,
  2: partlyCloudy,
  3: partlyCloudy,
  45: fog,
  48: fog,
  51: fog,
  53: fog,
  55: fog,
  61: showers,
  63: showers,
  65: showers,
  66: freezingRain,
  67: freezingRain,
  71: snow,
  73: snow,
  75: snow,
  80: rain,
  81: rain,
  82: rain,
  95: thunderstorm,
};

export const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
};
