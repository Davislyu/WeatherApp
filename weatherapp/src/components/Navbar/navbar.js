import React, { useState } from "react";
import logo from "../../assets/jllLoogo.png"
import { CiMenuBurger } from "react-icons/ci";
import { IoIosArrowRoundUp } from "react-icons/io";



const Navbar = () => {
    const [isToggled, setIsToggled] = useState(false)
    const handleToggle = () => {
        setIsToggled(!isToggled)
    }

    return (
        <nav className="navbar sticky  w-full h-fit bg-opacity-40 bg-black flex  flex-col sm:flex-row backdrop-blur-md items-center justify-between gap-2 z-10">
            <img className="h-[7rem]" src={logo} alt="Logo" />
            <ul className={`flex flex-col  w-full text-center sm:justify-around sm:flex-row gap-8     text-white text-2xl`}>
                <li className={`${isToggled ? "hidden" : "block"} sm:block`}>Home</li>
                <li className={`${isToggled ? "hidden" : "block"} sm:block`}>Favorites</li>
            </ul>
            <i onClick={handleToggle} className="text-4xl block sm:hidden text-white " >
                {isToggled ? <CiMenuBurger /> : <IoIosArrowRoundUp />}
            </i>
        </nav >
    );
};

export default Navbar