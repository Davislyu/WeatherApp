import { createSlice } from "@reduxjs/toolkit";
import { getLocationKey, getCurrentWeather, getFiveDayForecast } from "./weatherApi";

const initialState = {
    currentLocation: '',
    currentWeather: null,
    forecast: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
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


        setError(state, action) {
            state.error = action.payload;
            state.status = 'failed';
        },

    }
});


export const {
    setCurrentLocation,
    setCurrentWeather,
    setForecast,
    setLoading,
    setError
} = weatherSlice.actions;


export function fetchWeather(location) {
    return async function (dispatch) {
        dispatch(setLoading());
        try {
            const { key: locationKey, localizedName } = await getLocationKey(location); //We define 2 veriables since we pulled 2 different values from the Api
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