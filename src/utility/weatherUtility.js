import {
  setCity,
  setCurrentWeather,
  setWeatherUnits,
  setLoading,
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
};
