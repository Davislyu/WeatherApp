import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from "./weatherSlice";

const Weather = () => {
    const [location, setLocation] = useState('');
    const dispatch = useDispatch();
    const weather = useSelector(state => state.weather);
    const { currentWeather, forecast, status, error } = weather;

    const handleSearch = () => {
        dispatch(fetchWeather(location));
    };

    return (
        <div>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
            />
            <button onClick={handleSearch}>Search</button>

            {status === 'loading' && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {currentWeather && (
                <div>
                    <h1>{weather.currentLocation}</h1>              {/*Represents the name of the desired location */}
                    <h2>{currentWeather.Temperature.Metric.Value}°C</h2>    {/*Represents the actual degrees of the desired location */}
                    <p>{currentWeather.WeatherText}</p> {/*Represents the sky status of the desired location */}
                </div>
            )}


            {forecast && (
                <div>
                    <h3 className='underline'  >5-Day Forecast</h3>
                    {forecast.map((day, index) => {
                        const date = new Date(day.Date);
                        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

                        return (
                            <div key={index}>
                                <h3>{dayOfWeek}</h3>
                                <h3  >{day.Temperature.Minimum.Value}°C - {day.Temperature.Maximum.Value}°C</h3>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Weather;
