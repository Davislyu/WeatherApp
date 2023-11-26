import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentLocation: '',
    currentWeather: null,
    forecast: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};


