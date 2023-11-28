import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './weatherSlice';
import backgroundVid from "../../assets/vecteezy_evening-sky-shining-bright-there-were-many-stars-in-the-sky_7010363.mp4"
import dayImg from "../../assets/dayPic.jpg";
import nightImg from "../../assets/nightPic.png"
import toast, { Toaster } from 'react-hot-toast';
import { Input } from "@material-tailwind/react";
import { getAutocompleteSuggestions } from "./Autocomplete"







const Weather = () => {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]); // State for autocomplete suggestions

    const dispatch = useDispatch();
    const weather = useSelector((state) => state.weather);
    const { currentWeather, forecast, status, error } = weather;

    const handleInputChange = (e) => {
        const userInput = e.target.value;
        setLocation(userInput);

        // Fetch autocomplete suggestions based on user input
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
        // Optionally, you can also clear the suggestions here by resetting the state.
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
            <video autoPlay loop muted className="fixed loop  top-0 left-0 min-w-full min-h-full object-cover z-0">
                <source src={backgroundVid} type="video/mp4" />
            </video>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">


                <div className="bg-opacity-60 box-border rounded-xl xl:text-sm backdrop-blur-md border border-black gap-20 border-opacity-30 p-6">
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                    />

                    <form className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Input variant="standard"
                            label="Location"
                            type="text"
                            className="p-4    font-semibold  placeholder:font-semibold text-xl w-[50vw] md:w-[30vw] bg-transparent lg:w-[20vw]"
                            // placeholder="Enter location"
                            value={location}
                            onChange={handleInputChange}
                        />
                        <button
                            className="p-4 font-semibold text-white   text-2xl w-[50vw] rounded sm:w-[auto]"
                            onClick={handleSearch}
                        >
                            Search
                        </button>




                    </form>
                    {location && suggestions && suggestions.length > 0 && (
                        <div className="autocomplete-dropdown">
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
                            <div className=' flex flex-col gap-[2rem] box-border'>
                                <h1 className="text-4xl font-semibold">
                                    {weather.currentLocation}
                                </h1>
                                <h2 className="text-5xl">
                                    {currentWeather.Temperature.Metric.Value}°C
                                </h2>
                                <p className="text-3xl">{currentWeather.WeatherText}</p>
                            </div>
                        )}

                        {forecast && (
                            <div className="flex mt-40 flex-wrap justify-center">
                                {forecast.map((day, index) => {
                                    const date = new Date(day.Date);
                                    const weatherIcon = currentWeather.WeatherIcon
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
                                                minTemperature: Math.round(
                                                    ((day.Temperature.Minimum.Value - 32) * 5) / 9
                                                ),
                                                maxTemperature: Math.round(
                                                    ((day.Temperature.Maximum.Value - 32) * 5) / 9
                                                ),
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>


    );
};

export default Weather;

const Card = ({ day, DayTime }) => {
    const backgroundImage = day.DayTime ? dayImg : nightImg;

    return (
        <div
            className="p-10 flex box-content   rounded-lg m-4"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: "70%"
            }}
        >
            <div className="h-48 w-[60vw] sm:w-[30vw] md:w-[10vw] flex flex-col items-center justify-between bg-opacity-60 rounded-lg">
                <h3 className="text-2xl font-semibold">
                    {day.dayOfWeek}
                </h3>
                <img className='h-[5rem] w-[10rem]' src={`/weatherIcons/${day.weatherIcon}.png`} alt="Weather Icon" />
                <h3 className="text-black bg-blue-50 rounded rounded-xl p-1 opacity-80 text-2xl">
                    {day.minTemperature}°C - {day.maxTemperature}°C
                </h3>
            </div>
        </div>
    );
};
