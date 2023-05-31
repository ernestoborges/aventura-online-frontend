import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store';


interface IProfileData {
    data: {
        avatar_url: string
        username: string
        email: string
        birthDate: string
        createdAt: string
    } | null
}

const initialState: IProfileData = {
    data: null,
};

export const profileDataSlice = createSlice({
    name: 'profileData',
    initialState,
    reducers: {
        setProfileData: (state, action) => {
            state.data = action.payload;
        },
        setProfileImage: (state, action) => {
            if (state.data)
                state.data.avatar_url = action.payload;
        }
    },
})

export const { setProfileData, setProfileImage } = profileDataSlice.actions;
export const getProfileData = (state: RootState) => state.profileData.data;

export default profileDataSlice.reducer;
