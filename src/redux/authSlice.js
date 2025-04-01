import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    user: "",
    email: "",
    password:"",
    token:""
}

export const authSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        // Login Actions
        loginFormSuccess: (state, action) => {
            state.id = action.payload.id;
            state.user = action.payload.user;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.token = action.payload.token;
        },
        // Get User Actions
        getUserSuccess: (state, action) => {
            state.id = action.payload.id;
            state.user = action.payload.user;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.token = action.payload.token;
        },
        // Logout Actions
        logoutFormSuccess: (state) => {
            state.id = "";
            state.user = "";
            state.email = "";
            state.password = "";
            state.token = "";
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    loginFormSuccess,
    getUserSuccess,
    logoutFormSuccess,
} = authSlice.actions;

export default authSlice.reducer;