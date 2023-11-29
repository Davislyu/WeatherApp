// Navbar.js
import React, { useState } from "react";
import logo from "../assets/jllLoogo.png";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowRoundUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleTemperatureUnit } from "../features/weather/weatherSlice";
import { Switch } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);
  const currentWeather = weather.currentWeather; // Get currentWeather directly
  const isCelsius = useSelector((state) => state.weather.isCelsius);
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const isDayTime = currentWeather ? currentWeather.IsDayTime : false;

  return (
    <nav className="navbar absolute top-0 left-0 right-0 w-full h-fit bg-transparent backdrop-blur-sm flex  flex-col sm:flex-row  items-center justify-between gap-2  z-10 ">
      <img className="h-[6rem] p-4" src={logo} alt="Logo" />
      <ul
        className={`flex flex-col ${
          isDayTime ? "text-black" : "text-yellow-700"
        }  w-full text-center sm:justify-around sm:flex-row gap-8  text-2xl`}
      >
        <li className={`${isToggled ? "hidden" : "block"} sm:block font-bold`}>
          <Link to={`/`}>Home</Link>
        </li>
        <li className={`${isToggled ? "hidden" : "block"} sm:block font-bold `}>
          <Link to={`/favorites`}>Favorites</Link>
        </li>
      </ul>
      <i
        onClick={handleToggle}
        className="text-4xl block sm:hidden  hover:cursor-pointer "
      >
        {isToggled ? <CiMenuBurger /> : <IoIosArrowRoundUp />}
      </i>
      <div className="flex gap-2 p-2 ">
        <span>F°</span>
        <Switch
          checked={isCelsius}
          onChange={() => dispatch(toggleTemperatureUnit())}
        />
        <span>C°</span>
      </div>
    </nav>
  );
};

export default Navbar;
