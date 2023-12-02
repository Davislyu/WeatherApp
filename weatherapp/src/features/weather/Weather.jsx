import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./weatherSlice";
import toast, { Toaster } from "react-hot-toast";
import { getAutocompleteSuggestions } from "./weatherApi";
import { addFavorite } from "../favorites/favoritesSlice";
import { convertCelToFer, convertFerToCel } from "./weatherUtils";
import Card from "../../components/Card";
import { Combobox, Transition } from "@headlessui/react";
import vectorPurp from "../../assets/vectorPurpl.jpg";
import dayday from "../../assets/daydayday.jpg";
import dayImg from "../../assets/dayPic.jpg";
import { CiSearch } from "react-icons/ci";

const Weather = () => {
  const [suggestions, setSuggestions] = useState([]); // State for autocomplete suggestions
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const weather = useSelector((state) => state.weather);
  const isCelsius = useSelector((state) => state.weather.isCelsius);
  const { currentWeather, forecast, status, error, currentLocation } = weather;
  const [selectedSuggestion, setSelectedSuggestion] = useState([]); // State for the selected suggestion
  const [query, setQuery] = useState("");

  const handleSaveLocation = () => {
    if (
      favorites.favorites.some(
        (favorite) => favorite.locationName === currentLocation
      )
    ) {
      // This toast is for when the location is already in favorites
      toast(`${weather.currentLocation} is already in your saved locations.`, {
        icon: "👻",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      // Dispatch the action to add the favorite
      dispatch(
        addFavorite({
          locationKey: weather.currentLocationKey,
          locationName: weather.currentLocation,
          currentWeather: weather.currentWeather,
        })
      );

      // This toast is for when a new location is added to favorites
      toast(`${weather.currentLocation} was added to your favorites.`, {
        icon: "🤝",
        style: {
          borderRadius: "10px",
          background: "#3c9636",
          color: "black",
        },
      });
    }
  };

  const handleSaveClick = () => {
    handleSaveLocation();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedSuggestion) {
      dispatch(fetchWeather(selectedSuggestion.LocalizedName));
    }
  };
  const filteredSuggestions =
    query === ""
      ? suggestions
      : suggestions.filter((suggestion) =>
          suggestion.LocalizedName.toLowerCase().includes(query.toLowerCase())
        );
  useEffect(() => {
    if (error) {
      toast.error("Error: " + error);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (query.length > 0) {
      getAutocompleteSuggestions(query)
        .then((suggestions) => {
          setSuggestions(suggestions || []);
        })
        .catch((error) => {
          console.error("Error fetching autocomplete suggestions:", error);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <main
      style={{
        backgroundImage: `url(${
          currentWeather && currentWeather.IsDayTime !== undefined
            ? currentWeather.IsDayTime
              ? dayday
              : vectorPurp
            : dayImg
        })`,
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
      <div className="relative z-10 mt-[19vh] sm:mt-0 flex flex-col items-center">
        <div className="bg-opacity-60 min-h-screen   box-border xl:text-sm gap-20 border-opacity-30 p-6 items-center">
          <Toaster position="bottom-center" reverseOrder={false} />
          <div className="flex gap-2 justify-center  ">
            <form onSubmit={handleSearch}>
              <Combobox
                value={selectedSuggestion}
                onChange={setSelectedSuggestion}
                className="flex"
              >
                <div className="relative ">
                  <Combobox.Input
                    className="w-[80vw] sm:w-[50vw] md:w-[50vw] lg:w-[30vw] border border-black py-2 pl-3 pr-10 text-sm  bg-white backdrop-blur-lg placeholder:text-black opacity-40 leading-5 text-gray-900 focus:ring-0"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(suggestion) =>
                      suggestion?.LocalizedName || ""
                    }
                    placeholder="Enter location..."
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 bg-red-900 flex items-center pr-2 mt-10"></Combobox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full z-50  mt-10 overflow-auto scroll-hidden  bg-white opacity-80    py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {filteredSuggestions.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none px-4 py-2  text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredSuggestions.map((suggestion) => (
                          <Combobox.Option
                            key={suggestion.Key}
                            className={({ active }) =>
                              `relative cursor-default hover:cursor-pointer   select-none py-2 pl-10 pr-4 ${
                                active ? "bg-blue-700 " : "text-gray-900"
                              }`
                            }
                            value={suggestion}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {suggestion.LocalizedName}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-blue-200"
                                    }`}
                                  ></span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </form>
            <button
              type="submit"
              className="text-2xl w-[50vw] font-semibold rounded sm:w-[auto] w-fit text-black"
              disabled={!selectedSuggestion}
              onClick={handleSearch}
            >
              <CiSearch />
            </button>
          </div>

          <div className="mt-20 text-center mx-auto">
            {status === "loading" && <p className="text-xl">Loading...</p>}
            {currentWeather && (
              <div className=" flex flex-col gap-[2rem] box-border font-thin   relative   bg-opacity-30  w-fit   left-[50%] translate-x-[-50%] rounded-2xl p-2 ">
                <h1 className="text-4xl   ">{currentLocation}</h1>
                <h2 className="text-5xl font-thin">
                  {currentWeather &&
                  currentWeather.Temperature &&
                  currentWeather.Temperature.Metric ? (
                    isCelsius ? (
                      `${currentWeather.Temperature.Metric.Value}°C`
                    ) : (
                      `${convertCelToFer(
                        currentWeather.Temperature.Metric.Value
                      )}°F`
                    )
                  ) : (
                    <div className="text-sm">
                      <h1>Error in fetching data from the API</h1>
                      <h3 className="text-red-500 ">
                        Check your API key / internet connection
                      </h3>
                    </div>
                  )}
                </h2>
                <p className="text-3xl font-thin">
                  {currentWeather.WeatherText}
                </p>
                {currentWeather && currentWeather.Temperature && (
                  <div>
                    {weather.currentLocation !== "" &&
                    favorites.favorites.some((favorite) => {
                      return favorite.locationName === currentLocation;
                    }) ? (
                      <button
                        className="save-button  bg-black text-white w-full"
                        onClick={handleSaveClick}
                      >
                        Saved
                      </button>
                    ) : (
                      <button
                        className="save-button  bg-black text-white  w-full "
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {forecast && (
              <div className="flex flex-col mt-[4rem] gap-20 lg:flex-wrap lg:flex-row mx-auto justify-center  ">
                {forecast.map((day, index) => {
                  const date = new Date(day.Date);
                  const weatherIcon = day.Day.Icon;

                  const DayTime = currentWeather.IsDayTime;

                  const dayOfWeek = date.toLocaleDateString("en-US", {
                    weekday: "long",
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
                          ? Math.round(
                              convertFerToCel(day.Temperature.Minimum.Value)
                            )
                          : Math.round(day.Temperature.Minimum.Value),
                        maxTemperature: isCelsius
                          ? Math.round(
                              convertFerToCel(day.Temperature.Minimum.Value)
                            )
                          : Math.round(day.Temperature.Maximum.Value),
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Weather;
