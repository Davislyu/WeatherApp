import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './weatherSlice';
import './Weather.css'; // Import your custom CSS file for styling
import image from '../../assets/appBackground.jpg';

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
        <div className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center">
            <div className="bg-opacity-60 rounded-xl p-8 backdrop-blur-md border border-opacity-30  ">
                <form className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <input
                        type="text"
                        className="p-4 border roun border-black text-xl "
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button
                        className="p-4 border border-yellow-500 hover:bg-yellow-500 hover:text-white transition-all text-xl"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </form>
                <div className="mt-6 text-center">
                    {status === 'loading' && <p className="text-xl">Loading...</p>}
                    {error && <p className="text-xl">Error: {error}</p>}
                    {currentWeather && (
                        <div>
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
                        <div className="flex flex-wrap justify-center mt-6">
                            {forecast.map((day, index) => {
                                const date = new Date(day.Date);
                                const dayOfWeek = date.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                });

                                return (
                                    <Card
                                        key={index}
                                        day={{
                                            dayOfWeek: dayOfWeek,
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
    return (
        <div className="p-4 flex box-content border border-black rounded-lg m-4">
            <div className="h-48 w-48">
                <h3 className="text-2xl font-semibold">
                    {day.dayOfWeek}
                </h3>
                <h3 className="text-3xl">
                    {day.minTemperature}°C - {day.maxTemperature}°C
                </h3>
            </div>
        </div>
    );
};
