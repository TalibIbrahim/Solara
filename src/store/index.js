import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWeather: {},
  dailyWeather: {
    time: [],
    weather_code: [],
    temperature_2m_max: [],
    temperature_2m_min: [],
    rain_sum: [],
  },
  weatherUnits: {},
  loading: true,
  city: "...",

  coordinates: { lat: null, lon: null },
};

const weatherSlice = createSlice({
  initialState,
  name: "weather",
  reducers: {
    setCurrentWeather(state, action) {
      state.currentWeather = action.payload;
    },
    setWeatherUnits(state, action) {
      state.weatherUnits = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setCoordinates(state, action) {
      state.coordinates = action.payload;
    },
    setDailyWeather(state, action) {
      state.dailyWeather = action.payload;
    },
  },
});

const store = configureStore({
  reducer: weatherSlice.reducer,
});

export const {
  setCurrentWeather,
  setWeatherUnits,
  setLoading,
  setCity,
  setCoordinates,
  setDailyWeather,
} = weatherSlice.actions;
export default store;
