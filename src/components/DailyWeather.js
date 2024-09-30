import React from "react";
import { useSelector } from "react-redux";
import { weatherCodeMapping, getDayOfWeek } from "../utility/weatherUtility";

import Skeleton from "react-loading-skeleton"; // Import the Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Add CSS for Skeleton

import "./DailyWeather.css";

const DailyWeather = () => {
  const { dailyWeather, isLoading } = useSelector((state) => ({
    dailyWeather: state.dailyWeather,
    isLoading: state.loading,
  }));

  const loadingState = (
    <div className="flex items-center justify-center daily-weather-card pt-4  w-95 sm:w-11/12 flex-col flex-nowrap text-white text-center text-2xl rounded-2xl">
      {Array.from({ length: 7 }, (_, index) => (
        <div
          key={index}
          className="flex w-full justify-around items-center p-5 font-semibold flex-col"
        >
          <div className="w-full flex flex-row items-center justify-around pb-5">
            <p className="w-10 md:w-32 text-xl md:text-2xl">
              <Skeleton width={120} height={30} />
            </p>
            <div className="flex items-center justify-center w-9 h-8 md:w-14 md:h-12">
              <Skeleton width={65} height={55} />
            </div>
            <p className="w-10 text-start text-xl minTempColor font-normal md:text-2xl">
              <Skeleton width={75} height={25} />
            </p>
            <p className="w-10 text-start text-xl font-normal md:text-2xl">
              <Skeleton width={75} height={25} />
            </p>
          </div>
          <div className="customBorderStyle"></div>
        </div>
      ))}
    </div>
  );

  // destructuring the daily weather data
  const {
    time = [],
    weather_code = [],
    temperature_2m_max = [],
    temperature_2m_min = [],
  } = dailyWeather;

  return (
    <div className="flex items-center justify-center w-full mb-28">
      {isLoading ? (
        loadingState
      ) : (
        <div className="flex items-center justify-center daily-weather-card pt-4  w-95 sm:w-11/12 flex-col flex-nowrap text-white text-center text-2xl rounded-2xl">
          {time.map((date, index) => {
            const weatherCode = weather_code[index];
            const day = index === 0 ? "Today" : getDayOfWeek(date);
            const weatherIcon = weatherCodeMapping[weatherCode];
            const maxTemp = Math.round(temperature_2m_max[index]);
            const minTemp = Math.round(temperature_2m_min[index]);

            return (
              <div
                key={index}
                className=" flex w-full justify-around items-center p-5 font-semibold flex-col   "
              >
                <div className="w-full flex flex-row items-center justify-around pb-5">
                  <p className="w-10 md:w-32 text-xl md:text-2xl ">{day}</p>
                  <div className="flex items-center justify-center w-9 h-8 md:w-14 md:h-12">
                    <img
                      src={weatherIcon}
                      alt={weatherCode}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <p className="w-10 text-center text-xl minTempColor font-normal md:text-2xl">
                    {minTemp}
                  </p>
                  <p className="w-10 text-center text-xl font-normal md:text-2xl">
                    {maxTemp}
                  </p>
                </div>

                <div className="customBorderStyle"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DailyWeather;
