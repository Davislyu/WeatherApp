import { createSlice } from "@reduxjs/toolkit";
import { getLocationKey, getCurrentWeather, getFiveDayForecast } from "./weatherApi";

const initialState = {
    currentLocation: '', //Current location name only.
    currentWeather: null, //Current day forcast data 
    forecast: [], //Contains data about the following 5 days.
    status: 'idle', // Options : 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isCelsius: true, //Checking if the current state of the degree type is Celsius
};


const weatherSlice = createSlice({
    name: "weather",
    initialState: initialState,
    reducers: {
        setCurrentLocation(state, action) {
            state.currentLocation = action.payload;
        },
        setCurrentWeather(state, action) {
            state.currentWeather = action.payload;
            state.status = "succeeded"
        },
        setForecast(state, action) {
            state.forecast = action.payload;
            state.status = 'succeeded';

        },

        setLoading(state) {
            state.status = "loading";
        },
        resetError(state) {
            state.error = null;
        },


        setError(state, action) {
            state.error = action.payload;
            state.status = 'failed';
        },
        toggleTemperatureUnit: (state) => {
            state.isCelsius = !state.isCelsius;
        },

    }
});


export const {
    setCurrentLocation,
    setCurrentWeather,
    setForecast,
    setLoading,
    setError,
    resetError,
    toggleTemperatureUnit
} = weatherSlice.actions;


export function fetchWeather(location) {
    return async function (dispatch) {
        dispatch(setLoading());
        dispatch(resetError()); // Reset the error state before fetching
        try {
            const { key: locationKey, localizedName } = await getLocationKey(location);
            const currentWeather = await getCurrentWeather(locationKey);
            const forecast = await getFiveDayForecast(locationKey);

            dispatch(setCurrentLocation(localizedName));
            dispatch(setCurrentWeather(currentWeather));
            dispatch(setForecast(forecast));
        } catch (error) {
            dispatch(setError(error.message));
        }
    };
};


export default weatherSlice.reducer;