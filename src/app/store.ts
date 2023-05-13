import { configureStore } from '@reduxjs/toolkit';
import profileDataReducer from '../features/profileData/profileDataSlice';
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
    reducer: {
        profileData: profileDataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;