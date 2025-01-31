import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        addToFavorites: (state, action) => {
            // Check if the product is not already in the favorites
            if(!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        },
        removeFromFavorites: (state, action) => {
            // Remove the product from the favorites
            return state.filter((product) => product._id !== action.payload._id);
        },
        setFavorites: (state, action) => {
            // Set the favorites from local Storage
            return action.payload;
        }
    }
});


export const {addToFavorites, removeFromFavorites, setFavorites} = favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;