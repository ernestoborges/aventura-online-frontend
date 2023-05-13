import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';


interface ProfileState {
    data: {
        username: string
        email: string
    } | null
    isLoggedIn: boolean
}

const initialState: ProfileState = {
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
export const isLoggedIn = (state: RootState) => state.profileData.isLoggedIn;

export default profileDataSlice.reducer;
