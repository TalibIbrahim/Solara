import { configureStore, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentWeather: {},
  weatherUnits: {},
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
  },
});

const store = configureStore({
  reducer: weatherSlice.reducer,
});

export const { setCurrentWeather, setWeatherUnits } = weatherSlice.actions;
export default store;
