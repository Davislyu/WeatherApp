import React from 'react';
import { useSelector } from 'react-redux';
import dayImg from "../../assets/dayPic.jpg"

const Favorites = () => {

    const favorites = useSelector((state) => state.favorites.favorites);
    const favoritesNames = useSelector((state) => state.favorites.favoritesLocationNames)
    return (

        <div className="favorites-container">
            <div
                style={{
                    backgroundImage: `url(${dayImg})`,
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
            {favorites.map((favorite, index) => (
                <div key={index}>
                    {/* Ensure locationName is a string */}
                    <h1 className='text-black'>{favorite.locationName}</h1>

                    {/* Render specific properties of currentWeather */}
                    {favorite.currentWeather && (
                        <div>
                            <h2 className='text-black'>{favorite.currentWeather.WeatherText}</h2>
                            <h3 className='text-black'>
                                {favorite.currentWeather.Temperature.Metric.Value}°{favorite.currentWeather.Temperature.Metric.Unit}
                            </h3>
                        </div>
                    )}
                </div>
            ))}

            {favoritesNames.map((loc, indx) => (
                <div key={indx} className="as">
                    <h1>{loc}</h1>
                </div>
            ))}
        </div>
    );
};

export default Favorites;