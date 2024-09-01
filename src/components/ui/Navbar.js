import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-neutral-900 h-24 flex justify-between items-center ">
      <div className="text-white poppins-semibold text-4xl lg:text-6xl ml-8 lg:ml-20 cursor-pointer ">
        Solara
      </div>
      <div className="links flex space-x-6 lg:-space-x-14 mr-20 lg:mr-20 text-lg lg:text-2xl">
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          API
        </a>
        <a
          href="https://github.com/TalibIbrahim/Solara"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
