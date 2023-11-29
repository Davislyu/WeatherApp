import React from "react";
import { useSelector } from "react-redux";
import dayImg from "../../assets/dayPic.jpg";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  return (
    <div
      style={{
        backgroundImage: `url(${dayImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        paddingTop: "100px",
      }}
    >
      {favorites.map((favorite, index) => (
        <div key={index}>
          {/* Ensure locationName is a string */}
          <h1 className="text-black">{favorite.locationName}</h1>

          {/* Render specific properties of currentWeather */}
          {favorite.currentWeather && (
            <div>
              <h2 className="text-black">
                {favorite.currentWeather.WeatherText}
              </h2>
              <h3 className="text-black">
                {favorite.currentWeather.Temperature.Metric.Value}°
                {favorite.currentWeather.Temperature.Metric.Unit}
              </h3>
            </div>
          )}
        </div>
      ))}

      {favorites.map((favorite, indx) => (
        <div key={`favorite-${indx + 1}`} className="as">
          <h1>{favorite.locationName}</h1>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
