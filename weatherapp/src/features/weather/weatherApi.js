
const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;
const BASE_URL = 'http://dataservice.accuweather.com/';



export const getLocationKey = async (location) => {
    const query = encodeURIComponent(location);
    const response = await fetch(`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`);
    const data = await response.json();
    const locationData = data[0] || {};
    return {
        key: locationData.Key, // Returns the location key which we are going to use later to fetch data about the requested country.
        localizedName: locationData.LocalizedName //Since we need to get 2 data values, we split the return for 2 parts.
    };
};

export const getCurrentWeather = async (locationKey) => { //Daily weather forcast.
    const response = await fetch(`${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`);
    const data = await response.json();
    return data[0];
};

export const getFiveDayForecast = async (locationKey) => { //5 Day forcast.
    const response = await fetch(`${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`);
    const data = await response.json();
    return data.DailyForecasts;
};



