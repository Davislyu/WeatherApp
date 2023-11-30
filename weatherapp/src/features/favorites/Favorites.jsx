import React from "react";
import { useSelector } from "react-redux";
import dayImg from "../../assets/dayPic.jpg";
import vectorPurp from "../../assets/vectorPurpl.jpg";
import dayday from "../../assets/daydayday.jpg";
import { convertCelToFer, convertFerToCel } from "../weather/weatherUtils";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const weather = useSelector((state) => state.weather);
  const isCelsius = useSelector((state) => state.weather.isCelsius);

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
            className="relative grid h-[20rem] w-[90vw] md:w-[40vw] lg:w-[30vw] xl:2-[20vw]  top-60  items-end justify-center overflow-hidden text-center"
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

            <CardBody className="relative py-14 px-6 md:px-12">
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
              <Avatar
                size="xl"
                variant="circular"
                alt="tania andrew"
                className="border-2 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
