import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: []

};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload);

        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter((favorite) => favorite.locationKey !== action.payload)
        }
    }
})

export const { addFavorite, removeFavorite, addFavoriteLocationName } = favoritesSlice.actions;
export default favoritesSlice.reducer;