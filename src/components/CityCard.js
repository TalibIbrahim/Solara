import React from "react";
import { useSelector } from "react-redux";
import "./CityCard.css";
import Tilt from "react-parallax-tilt";

const CityCard = () => {
  const city = useSelector((state) => state.city);

  return (
    <div className="  text-xl text-white poppins-semibold flex justify-center items-center mt-5 ">
      <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7}>
        <div className="city-card flex flex-row p-3 px-5  rounded-full">
          <span className="material-symbols-outlined mt-0.5 mr-2">
            location_on
          </span>
          <p>{city}</p>
        </div>
      </Tilt>
    </div>
  );
};

export default CityCard;
