import React, { useState } from "react";
import logo from "../../assets/jllLoogo.png"
import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowRoundUp } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemperatureUnit } from "../../features/weather/weatherSlice";
import { Switch } from "@material-tailwind/react";



const Navbar = () => {
    const dispatch = useDispatch();

    const isCelsius = useSelector((state) => state.weather.isCelsius);

    const [isToggled, setIsToggled] = useState(false)
    const handleToggle = () => {
        setIsToggled(!isToggled)
    }

    return (
        <nav className="navbar sticky  w-full h-fit bg-opacity-40 bg-cyan-100 flex  flex-col sm:flex-row backdrop-blur-md items-center justify-between gap-2 z-10">
            <img className="h-[6rem] p-4" src={logo} alt="Logo" />
            <ul className={`flex flex-col  w-full text-center sm:justify-around sm:flex-row gap-8     text-white text-2xl`}>
                <li className={`${isToggled ? "hidden" : "block"} sm:block`}>Home</li>
                <li className={`${isToggled ? "hidden" : "block"} sm:block`}>Favorites</li>
            </ul>
            <i onClick={handleToggle} className="text-4xl block sm:hidden text-white hover:cursor-pointer p-6" >
                {isToggled ? <CiMenuBurger /> : <IoIosArrowRoundUp />}
            </i>
            <div className="flex gap-2 p-2 ">
                <span>F°</span>
                <Switch
                    checked={isCelsius} // Set the checked state of the switch
                    onChange={() => dispatch(toggleTemperatureUnit())} // Handle switch change
                />
                <span>C°</span>

            </div>

        </nav >
    );
};

export default Navbar



