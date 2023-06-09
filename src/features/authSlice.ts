import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store';


interface IAuth {
    accessToken: string
    isLoggedIn: boolean
}

const initialState: IAuth = {
    accessToken: "",
    isLoggedIn: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action:  PayloadAction<string>) => {
            localStorage.setItem("token", action.payload);
            state.isLoggedIn = true;
        },
        logout: (state) => {
            localStorage.setItem("token", "");
            state.accessToken = "";
            state.isLoggedIn = false;
        },
    },
})

export const { setAuth, logout } = authSlice.actions;
export const getAccessToken = (state: RootState) => state.auth.accessToken;
export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
