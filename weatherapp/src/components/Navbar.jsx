// Navbar.js
import React, { useState } from "react";
import logo from "../assets/jllLoogo.png";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowRoundUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleTemperatureUnit } from "../features/weather/weatherSlice";
import { Switch } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);
  const currentWeather = weather.currentWeather;
  const isCelsius = useSelector((state) => state.weather.isCelsius);
  const [isToggled, setIsToggled] = useState(true);
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const isDayTime = currentWeather ? currentWeather.IsDayTime : false;

  return (
    <nav className="navbar  top-0 left-0 right-0 w-full h-fit bg-transparent backdrop-blur-lg flex  flex-col sm:flex-row  items-center justify-between gap-2  z-10 ">
      <img className="h-[6rem] p-4" src={logo} alt="Logo" />
      <ul
        className={`flex flex-col ${
          isDayTime ? "text-black" : "text-white"
        }  w-full text-center sm:justify-start sm:ml-10 sm:flex-row gap-8  text-2xl`}
      >
        <li className={`${isToggled ? "hidden" : "block"} sm:block font-bold`}>
          <NavLink
            className={({ isActive, isPending }) => {
              return isActive ? "underline" : isPending ? "pending" : "";
            }}
            to={`/`}
          >
            Home
          </NavLink>
        </li>
        <li className={`${isToggled ? "hidden" : "block"} sm:block font-bold `}>
          <NavLink
            className={({ isActive, isPending }) => {
              return isActive ? "underline" : isPending ? "pending" : "";
            }}
            to={`/favorites`}
          >
            Favorites
          </NavLink>
        </li>
      </ul>
      <i
        onClick={handleToggle}
        className="text-4xl block sm:hidden hover:cursor-pointer "
      >
        {isToggled ? <CiMenuBurger /> : <IoIosArrowRoundUp />}
      </i>
      <div className="flex gap-2 p-2 ">
        <span className={`${isCelsius ? "text-black" : "text-white"}`}>F°</span>
        <Switch
          checked={isCelsius}
          onChange={() => dispatch(toggleTemperatureUnit())}
        />
        <span className={`${isCelsius ? "text-white" : "text-black"}`}>C°</span>
      </div>
    </nav>
  );
};

export default Navbar;
