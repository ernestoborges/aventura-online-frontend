import { configureStore } from '@reduxjs/toolkit';
import profileDataReducer from '../features/profileDataSlice';
import authDataReducer from '../features/authSlice';

export const store = configureStore({
    reducer: {
        profileData: profileDataReducer,
        auth: authDataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;