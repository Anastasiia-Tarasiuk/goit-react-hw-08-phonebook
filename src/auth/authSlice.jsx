import { createSlice } from "@reduxjs/toolkit";
import { authOperations } from "./authOperations";

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isGettingCurrentUser: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [authOperations.register.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        [authOperations.logIn.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        [authOperations.logOut.fulfilled](state, _) {
            state.user = initialState.user;
            state.token = initialState.token;
            state.isLoggedIn = false;
        },
        [authOperations.getCurrentUser.pending](state, _) {
            state.isGettingCurrentUser = true;
        },
        [authOperations.getCurrentUser.fulfilled](state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isGettingCurrentUser = false;
        },
        [authOperations.getCurrentUser.rejected](state, _) {
            state.isGettingCurrentUser = false;
        },

    },
})
