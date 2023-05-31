import { configureStore } from '@reduxjs/toolkit';
import profileDataReducer from '../features/profileDataSlice';
import authDataReducer from '../features/authSlice';
import newCharacterReducer from '../features/newCharacter';
import dndApiDataReducer from '../features/dnd5eData/dnd5eData';

export const store = configureStore({
    reducer: {
        profileData: profileDataReducer,
        auth: authDataReducer,
        newCharacter: newCharacterReducer,
        dndApiData: dndApiDataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;