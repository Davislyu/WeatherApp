import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './weatherSlice';
import image from '../../assets/appBackground.jpg';
import backgroundVid from "../../assets/vecteezy_evening-sky-shining-bright-there-were-many-stars-in-the-sky_7010363.mp4"
import dayImg from "../../assets/dayjpg.jpeg";
import nightImg from "../../assets/night.jpg"





const Weather = () => {
    const [location, setLocation] = useState('');
    const dispatch = useDispatch();
    const weather = useSelector((state) => state.weather);
    const { currentWeather, forecast, status, error } = weather;

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchWeather(location));

    };

    return (
        <>
            <video autoPlay loop muted className="fixed loop  top-0 left-0 min-w-full min-h-full object-cover z-0">
                <source src={backgroundVid} type="video/mp4" />
            </video>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">

                <div className="bg-opacity-60 box-border rounded-xl xl:text-sm backdrop-blur-md border border-black gap-20 border-opacity-30 p-6">

                    <form className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <input
                            type="text"
                            className="p-4 border rounded   border-black font-semibold  placeholder:font-semibold text-xl w-[50vw] md:w-[30vw] placeholder:text-black  placeholder:text-center bg-transparent lg:w-[20vw]"
                            placeholder="Enter location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <button
                            className="p-4 border border-black font-semibold hover:bg-black hover:text-white transition-all text-2xl w-[50vw] rounded sm:w-[auto]"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </form>
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
            }}
        >
            <div className="h-48 w-[60vw] sm:w-[30vw] md:w-[10vw] flex flex-col items-center justify-between bg-opacity-60 rounded-lg">
                <h3 className="text-2xl font-semibold">
                    {day.dayOfWeek}
                </h3>
                <img className='h-[5rem] w-[10rem]' src={`/weatherIcons/${day.weatherIcon}.png`} alt="Weather Icon" />
                <h3 className="text-black font-semibold text-2xl sm:text-white">
                    {day.minTemperature}°C - {day.maxTemperature}°C
                </h3>
            </div>
        </div>
    );
};
