import React from "react";
import { useSelector } from "react-redux";
import "./CityCard.css";
import Tilt from "react-parallax-tilt";
import Skeleton from "react-loading-skeleton"; // Import the Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Add CSS for Skeleton

const CityCard = () => {
  const city = useSelector((state) => state.city);
  const isLoading = useSelector((state) => state.loading);

  return (
    <div className="text-xl text-white poppins-semibold flex justify-center items-center mt-5">
      <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7}>
        <div className="city-card flex flex-row items-center p-3 px-5 rounded-full max-w-xs sm:max-w-md md:max-w-lg">
          <span
            className="material-symbols-outlined mr-2 text-base sm:text-xl md:text-2xl"
            style={{ verticalAlign: "middle" }}
          >
            location_on
          </span>
          <p className="text-base sm:text-lg md:text-xl leading-normal">
            {isLoading ? <Skeleton width={250} /> : city}
          </p>
        </div>
      </Tilt>
    </div>
  );
};

export default CityCard;
