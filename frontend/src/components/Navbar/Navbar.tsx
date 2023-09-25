import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-inherit h-20 w-full fixed left-0 top-0 flex items-center pl-2">
      <img
        src="/assets/Herb-Planet.png"
        alt="Herb Planet Logo"
        className="w-20 h-20"
      />
      <h1 className="text-2xl font-bold">HerbPlanet</h1>
    </nav>
  );
};

export default Navbar;
