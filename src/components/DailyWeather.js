import React from "react";
import { useSelector } from "react-redux";

const DailyWeather = () => {
  const dailyWeather = useSelector((state) => state.dailyWeather);
  console.log(dailyWeather);

  return <div>{/* Your HTML goes here */}</div>;
};

export default DailyWeather;
