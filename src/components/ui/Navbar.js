import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-neutral-900 h-20 flex justify-between items-center ">
      <div className="text-white poppins-semibold text-5xl ml-40  ">Solara</div>
      <div className="links mr-40">
        <a href="https://open-meteo.com/" target="_blank">
          API Service
        </a>
        <a href="https://github.com/TalibIbrahim/Solara" target="_blank">
          GitHub Repo
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
