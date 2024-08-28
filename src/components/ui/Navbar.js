import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-neutral-900 h-24 flex justify-between items-center ">
      <div className="text-white poppins-semibold text-6xl ml-40  cursor-pointer ">
        Solara
      </div>
      <div className="links mr-40">
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          API Service
        </a>
        <a
          href="https://github.com/TalibIbrahim/Solara"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub Repo
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
