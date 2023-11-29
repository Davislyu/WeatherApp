import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './weatherSlice';
import dayImg from "../../assets/dayPic.jpg";
import nightImg from "../../assets/nightPic.png"
import toast, { Toaster } from 'react-hot-toast';
import { Input } from "@material-tailwind/react";
import { getAutocompleteSuggestions } from "./Autocomplete"
import vectorPurp from "../../assets/vectorPurpl.jpg"
import dayday from "../../assets/daydayday.jpg"
import { addFavorite, addFavoriteLocationName } from "../../features/favorites/favoritesSlice";






const Weather = () => {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]); // State for autocomplete suggestions
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites)
    const weather = useSelector((state) => state.weather);
    const isCelsius = useSelector((state) => state.weather.isCelsius);
    const { currentWeather, forecast, status, error } = weather;



    const handleSaveLocation = () => {
        dispatch(addFavorite({
            locationKey: weather.currentLocationKey, // assuming you have a key for each location
            locationName: weather.currentLocation,
            currentWeather: weather.currentWeather
        }));
    };
    const handleSaveFavoriteLocationName = () => {
        const locationName = weather.currentLocation;

        // Check if the location is already in favorites
        if (favorites.favoritesLocationNames.includes(locationName)) {
            toast.error(`${locationName} is already in your saved locations.`);
            return;
        }

        // Dispatch action to save the location
        dispatch(addFavoriteLocationName(locationName));
    };



    const handleSaveClick = () => {
        handleSaveLocation()
        handleSaveFavoriteLocationName()
    }

    const handleInputChange = (e) => {
        const userInput = e.target.value;
        setLocation(userInput);

        getAutocompleteSuggestions(userInput)
            .then((suggestions) => {
                setSuggestions(suggestions);
            })
            .catch((error) => {
                console.error('Error fetching autocomplete suggestions:', error);
            });
    };

    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion.LocalizedName);
        setSuggestions([]);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchWeather(location));
    };

    useEffect(() => {
        if (error) {
            toast.error("Error: " + error);
        }
    }, [error, dispatch]);

    return (
        <>

            <div
                style={{
                    backgroundImage: `url(${currentWeather && currentWeather.IsDayTime !== undefined ? (currentWeather.IsDayTime ? dayday : vectorPurp) : dayImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                }}
            ></div >



            <div className="relative z-10 flex flex-col items-center mt-[10vh] min-h-screen">
                <div className="bg-opacity-60  box-border   xl:text-sm    gap-20 border-opacity-30 p-6">
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                    />

                    <form className="flex flex-col relative mx-auto   sm:w-[20vw]  items-center justify-center gap-6">
                        <Input
                            variant="standard"
                            color="black"
                            label="Location"
                            type="text"
                            className={`${currentWeather && currentWeather.IsDayTime !== undefined ? (currentWeather.IsDayTime ? "text-black" : "text-white") : "text-black"}    placeholder:font-semibold placeholder:text-black text-xl -[50vw] md:w-[30vw] bg-transparent lg:w-[20vw]`}
                            value={location}
                            onChange={handleInputChange}

                        />
                        <button
                            className={`   text-xl w-[50vw] font-semibold rounded sm:w-[auto]`}
                            onClick={handleSearch}
                        >
                            Search
                        </button>




                    </form>

                    {location && suggestions && suggestions.length > 0 && (

                        <div className="autocomplete-dropdown flex flex-col mt-8 gap-2 text-center">



                            {suggestions.map((suggestion) => (
                                <div

                                    key={suggestion.Key}
                                    className="autocomplete-suggestion hover:cursor-pointer"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >

                                    {suggestion.LocalizedName}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-20 text-center">
                        {status === 'loading' && <p className="text-xl">Loading...</p>}
                        {currentWeather && (
                            <div className=' flex flex-col gap-[2rem] box-border font-thin   relative   bg-opacity-30  w-fit   left-[50%] translate-x-[-50%] rounded-2xl p-2 '>

                                <h1 className="text-4xl   ">
                                    {weather.currentLocation}
                                </h1>

                                <h2 className="text-5xl font-thin">
                                    {isCelsius ? `${currentWeather.Temperature.Metric.Value}°C` : `${(currentWeather.Temperature.Metric.Value * 9 / 5) + 32}°F`}
                                </h2>
                                <p className="text-3xl font-thin">{currentWeather.WeatherText}</p>







                                {favorites.favoritesLocationNames.includes(weather.currentLocation) ?
                                    <button className="save-button">Saved</button> :
                                    <button className="save-button" onClick={handleSaveClick}>Save</button>
                                }
                            </div>
                        )}

                        {forecast && (
                            <div className="flex flex-col mt-40 gap-20 lg:flex-wrap lg:flex-row  justify-center  ">
                                {forecast.map((day, index) => {
                                    const date = new Date(day.Date);
                                    const weatherIcon = day.Day.Icon

                                    const DayTime = currentWeather.IsDayTime

                                    const dayOfWeek = date.toLocaleDateString('en-US', {
                                        weekday: 'long',
                                    });

                                    return (
                                        <Card
                                            key={index}
                                            day={{
                                                dayOfWeek: dayOfWeek,
                                                weatherIcon: weatherIcon,
                                                DayTime: DayTime,
                                                isCelsius: isCelsius,
                                                minTemperature: isCelsius
                                                    ? Math.round(((day.Temperature.Minimum.Value - 32) * 5) / 9)
                                                    : Math.round(day.Temperature.Minimum.Value),
                                                maxTemperature: isCelsius
                                                    ? Math.round(((day.Temperature.Maximum.Value - 32) * 5) / 9)
                                                    : Math.round(day.Temperature.Maximum.Value),
                                            }}
                                        />

                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>


    );
};

export default Weather;

const Card = ({ day }) => {

    return (

        <div className="h-48 w-[60vw] border lg:w-[10vw] lg:border-none rounded-3xl   flex flex-col items-center justify-between bg-opacity-60 rounded-lg ">
            <h3 className={`text-2xl ${day.IsDayTime ? "text-black" : "text-white"}   md:text-3xl  `}>
                {day.dayOfWeek}
            </h3>
            <img className='h-[5rem] w-[10rem]' src={`/weatherIcons/${day.weatherIcon}.png`} alt="Weather Icon" />
            <h3 className={`text-black  md:text-3xl  rounded  p-1 opacity-80 text-2xl `}>
                {day.isCelsius ? `${day.minTemperature}°C - ${day.maxTemperature}°C` : `${day.minTemperature}°F - ${day.maxTemperature}°F`}
            </h3>
        </div>
    );
};
