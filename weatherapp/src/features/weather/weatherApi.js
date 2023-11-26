
const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;
const BASE_URL = 'http://dataservice.accuweather.com/';

export const getLocationKey = async (location) => {
    const query = encodeURIComponent(location);
    const response = await fetch(`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`);
    const data = await response.json();

    return data[0]?.Key;
};

export const getCurrentWeather = async (locationKey) => {
    const response = await fetch(`${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`);
    const data = await response.json();
    return data;
};

export const getFiveDayForecast = async (locationKey) => {
    const response = await fetch(`${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`);
    const data = await response.json();
    return data.DailyForecasts;
};

