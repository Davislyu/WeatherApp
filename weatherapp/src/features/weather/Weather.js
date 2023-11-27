import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './weatherSlice';
import image from '../../assets/appBackground.jpg';
import dayImg from "../../assets/dayTime.webp";
import nightImg from "../../assets/nightTime.webp";




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
        <div
            style={{ backgroundImage: `url(${image})` }}
            className="bg-cover bg-center min-h-screen p-40 flex flex-col items-center  justify-center"
        >
            <div className="bg-opacity-60 box-border rounded-xl  xl:text-sm backdrop-blur-md border border-black gap-20 border-opacity-30">
                <form className="flex flex-col md:flex-row items-center mt-20 justify-center gap-6 p-6">
                    <input
                        type="text"
                        className="p-4 border rounded border-black text-xl w-[50vw] md:w-[30vw] placeholder:text-black placeholder:text-center  bg-transparent lg:w-[20vw]"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button
                        className="p-4 border border-black hover:bg-black hover:text-slate-200 transition-all text-2xl w-[50vw] rounded sm:w-[auto] "
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </form>
                <div className="mt-20 text-center">
                    {status === 'loading' && <p className="text-xl">Loading...</p>}
                    {error && <p className="text-xl">Error: {error}</p>}
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
    );
};

export default Weather;

const Card = ({ day }) => {
    const backgroundImage = day.DayTime ? dayImg : nightImg;

    return (
        <div
            className="p-10 flex box-content border border-black rounded-lg m-4"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',

            }}
        >
            <div className="h-48 w-[60vw] sm:w-[30vw] md:w-[10vw] flex flex-col items-center justify-between bg-opacity-60 rounded-lg">
                <h3 className="text-2xl font-semibold">
                    {day.dayOfWeek}
                </h3>
                <img className='h-[5rem] w-[10rem]' src={`/weatherIcons/${day.weatherIcon}.png`} alt="Weather Icon" />

                <h3 className="text-md text-white">
                    {day.minTemperature}°C - {day.maxTemperature}°C
                </h3>
            </div>
        </div>
    );
};

