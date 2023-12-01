import React from "react";
import { useSelector, useDispatch } from "react-redux";
import dayImg from "../../assets/bg.jpg";
import vectorPurp from "../../assets/vectorPurpl.jpg";
import dayday from "../../assets/daydayday.jpg";
import { convertCelToFer } from "../weather/weatherUtils";
import { removeFavorite } from "./favoritesSlice";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const Favorites = () => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);

  const isCelsius = useSelector((state) => state.weather.isCelsius);

  function handleDeletion(locationKey) {
    dispatch(removeFavorite(locationKey));
  }

  return (
    <div
      style={{
        backgroundImage: `url(${dayImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: -1,
        paddingTop: "100px",
        overflowY: "auto",
        height: "100vh",
      }}
    >
      <div className="flex flex-wrap justify-center gap-8  ">
        {favorites.map((favorite, index) => (
          <Card
            key={index}
            shadow={false}
            className="relative grid h-fit w-[90vw] md:w-[40vw] lg:w-[30vw] xl:2-[20vw]  top-60 items-center  justify-center overflow-hidden text-center"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              src={vectorPurp}
              className={`absolute inset-0 m-0 h-full w-full rounded-none`}
            >
              <img
                key={index}
                src={favorite.currentWeather.IsDayTime ? dayday : vectorPurp}
                alt="#"
                className="h-full w-full "
              />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full" />
            </CardHeader>

            <CardBody className="relative py-14   px-6 md:px-12">
              <Typography
                variant="h2"
                color={favorite.currentWeather.IsDayTime ? "black" : "white"}
                className="mb-6 font-thin leading-[1.5]"
              >
                {favorite.locationName}
              </Typography>

              <Typography
                variant="h5"
                color={favorite.currentWeather.IsDayTime ? "black" : "white"}
                className="mb-4 font-thin"
              >
                {favorite.currentWeather.WeatherText}
              </Typography>
              <Typography
                variant="h5"
                color={favorite.currentWeather.IsDayTime ? "black" : "white"}
                className="mb-4 font-thin "
              >
                {isCelsius
                  ? `${Math.round(
                      favorite.currentWeather.Temperature.Metric.Value
                    )}°C`
                  : `${Math.round(
                      convertCelToFer(
                        favorite.currentWeather.Temperature.Metric.Value
                      )
                    )}°F`}
              </Typography>
              <img
                className="h-[5rem] w-[10rem]"
                src={`/weatherIcons/${favorite.currentWeather.WeatherIcon}.svg`}
                alt="Weather Icon"
                b
              />
              <Button
                variant="text"
                onClick={() => handleDeletion(favorite.locationName)}
                className="relative text-black"
              >
                remove
              </Button>
              {console.log(favorites)}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
