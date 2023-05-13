import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

const initialState = {
    data: null,
    isLoggedIn: false,
};

export const profileDataSlice = createSlice({
    name: 'profileData',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.data = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.data = null;
            state.isLoggedIn = false;
        },
    },
})

export const { loginSuccess, logout } = profileDataSlice.actions;
export const getProfileData = (state: RootState) => state.profileData.data;

export default profileDataSlice.reducer;
