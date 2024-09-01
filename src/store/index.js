import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWeather: {},
  weatherUnits: {},
  loading: true,
  city: "...",
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
  },
});

const store = configureStore({
  reducer: weatherSlice.reducer,
});

export const { setCurrentWeather, setWeatherUnits, setLoading, setCity } =
  weatherSlice.actions;
export default store;
