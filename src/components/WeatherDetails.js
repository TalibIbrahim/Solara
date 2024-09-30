import React from "react";
import Tilt from "react-parallax-tilt";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton"; // Import the Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Add CSS for Skeleton

const WeatherDetails = () => {
  // currentWeather taken from the store

  const { currentWeather, weatherUnits, isLoading } = useSelector((state) => ({
    currentWeather: state.currentWeather,
    weatherUnits: state.weatherUnits,
    isLoading: state.loading,
  }));

  // card styles for the weather details
  const cardStyle =
    "detail-card w-44 h-28 sm:w-52 sm:h-24   lg:w-60 lg:h-24 text-xl lg:text-2xl  text-center mx-5 my-2 flex justify-center drop-shadow-md shadow-md items-center rounded-xl cursor-pointer";

  const DayCard = (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span class="material-symbols-outlined  mr-2 text-3xl">light_mode</span>
        <span>Day</span>
      </div>
      <div className="text-sm font-normal block mt-1 opacity-65 ">
        Time Of Day
      </div>
    </div>
  );

  const NightCard = (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span class="material-symbols-outlined  mr-2 text-3xl">dark_mode</span>
        <span>Night</span>
      </div>
      <div className="text-sm font-normal block mt-1 opacity-65 ">
        Time Of Day
      </div>
    </div>
  );

  // Destructuring the current weather data and units
  const feelsLike = `${currentWeather.apparent_temperature} ${weatherUnits.temperature_2m}`;
  const windDirection = `${currentWeather.wind_direction_10m}  ${weatherUnits.wind_direction_10m}`;
  const windSpeed = `${currentWeather.wind_speed_10m} ${weatherUnits.wind_speed_10m}`;
  const humidity = `${currentWeather.relative_humidity_2m} ${weatherUnits.relative_humidity_2m}`;
  const rain = `${currentWeather.rain} ${weatherUnits.rain}`;
  const timeOfDay = currentWeather.is_day ? DayCard : NightCard;
  const precipitation = `${currentWeather.precipitation} ${weatherUnits.precipitation}`;

  const windSpeedDIV = (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span className="material-symbols-outlined mr-3 text-3xl">air</span>
        <span>{windSpeed}</span>
      </div>
      <div className="text-sm font-normal block mt-1 opacity-65 ">
        Wind Speed
      </div>
    </div>
  );

  const humidityDIV = (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span class="material-symbols-outlined  mr-3 text-3xl">
          humidity_high
        </span>
        <span>{humidity}</span>
      </div>
      <div className="text-sm font-normal block mt-1 opacity-65 ">Humidity</div>
    </div>
  );

  const windDirectionDIV = (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span class="material-symbols-outlined  mr-4 text-3xl">explore</span>
        <span>{windDirection}</span>
      </div>
      <div className="text-sm font-normal block mt-1 opacity-65 ">
        Wind Direction
      </div>
    </div>
  );

  const rainDIV = (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span class="material-symbols-outlined  mr-3 text-3xl">rainy</span>
        <span>{rain}</span>
      </div>
      <div className="text-sm font-normal block mt-1 opacity-65 ">Rain</div>
    </div>
  );

  const feelsLikeDIV = (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span class="material-symbols-outlined text-4xl">thermometer</span>
        <span>{feelsLike}</span>
      </div>
      <div className="text-sm font-normal block mt-1 opacity-65 ">
        Feels Like
      </div>
    </div>
  );

  const precipitationDIV = (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span class="material-symbols-outlined mr-1 text-3xl">water_drop</span>
        <span>{precipitation}</span>
      </div>
      <div className="text-sm font-normal block mt-1 opacity-65 ">
        Precipitation
      </div>
    </div>
  );

  // Function to format time to 12-hour format
  const formatTimeTo12Hour = (timeString) => {
    const date = new Date(timeString);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString([], options);
  };

  return (
    <div className="card-container lg:w-3/4 lg:mt-4">
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        {isLoading ? (
          <Skeleton width={100} />
        ) : (
          currentWeather.time && formatTimeTo12Hour(currentWeather.time)
        )}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        {isLoading ? (
          <div>
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={15} />
          </div>
        ) : (
          timeOfDay
        )}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        {isLoading ? (
          <div>
            <Skeleton width={150} height={30} />
            <Skeleton width={100} height={15} />
          </div>
        ) : (
          windSpeedDIV
        )}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        {isLoading ? (
          <div>
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={15} />
          </div>
        ) : (
          humidityDIV
        )}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        {isLoading ? (
          <div>
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={15} />
          </div>
        ) : (
          windDirectionDIV
        )}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        {isLoading ? (
          <div>
            <Skeleton width={120} height={30} />
            <Skeleton width={50} height={15} />
          </div>
        ) : (
          rainDIV
        )}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        {isLoading ? (
          <div>
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={15} />
          </div>
        ) : (
          feelsLikeDIV
        )}
      </Tilt>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} className={cardStyle}>
        {isLoading ? (
          <div>
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={15} />
          </div>
        ) : (
          precipitationDIV
        )}
      </Tilt>
    </div>
  );
};

export default WeatherDetails;
