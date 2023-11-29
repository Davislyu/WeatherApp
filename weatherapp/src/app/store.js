import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import favoritesReducer from "../features/favorites/favoritesSlice"


const store = configureStore({
    reducer: {
        weather: weatherReducer,
        favorites: favoritesReducer,

    },
});
export default store;
