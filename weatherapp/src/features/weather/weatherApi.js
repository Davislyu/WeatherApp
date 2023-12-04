import axios from 'axios';

const API_KEY = "JQbSataoyYWYSWyCtJ9VgAby8GAAWgQh";
const BASE_URL = 'https://dataservice.accuweather.com/';





const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        apikey: API_KEY
    }
});






export const getLocationKey = async (location) => {
    const query = encodeURIComponent(location);
    try {
        const response = await axiosInstance.get(`/locations/v1/cities/autocomplete?q=${query}`);
        const locationData = response.data[0] || {};
        return {
            key: locationData.Key,
            localizedName: locationData.LocalizedName
        };
    } catch (error) {
        console.error('Error in getting the location key:', error);
        return {};
    }
};

export const getCurrentWeather = async (locationKey) => {
    try {
        const response = await axiosInstance.get(`/currentconditions/v1/${locationKey}`);
        console.log(response)
        return response.data[0];
    } catch (error) {
        console.error('Error in getting the current weather:', error);
        return {};
    }
};

export const getFiveDayForecast = async (locationKey) => {
    try {
        const response = await axiosInstance.get(`/forecasts/v1/daily/5day/${locationKey}`);
        return response.data.DailyForecasts;
    } catch (error) {
        console.error('Error in getting the 5 day forcast:', error);
        return [];
    }
};

export const getAutocompleteSuggestions = async (query) => {
    try {
        const response = await axiosInstance.get(`/locations/v1/cities/autocomplete?q=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        return [];
    }
};



