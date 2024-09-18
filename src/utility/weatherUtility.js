import {
  setCity,
  setCurrentWeather,
  setWeatherUnits,
  setLoading,
  setDailyWeather,
} from "../store";

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
  0: "Clear sky",
  1: "Partly cloudy",
  2: "Partly cloudy",
  3: "Partly cloudy",
  45: "Fog",
  48: "Fog",
  51: "Drizzle",
  53: "Drizzle",
  55: "Drizzle",
  61: "Rain",
  63: "Rain",
  65: "Rain",
  66: "Freezing rain",
  67: "Freezing rain",
  71: "Snow fall",
  73: "Snow fall",
  75: "Snow fall",
  80: "Showers",
  81: "Showers",
  82: "Showers",
  95: "Thunderstorm",
};
