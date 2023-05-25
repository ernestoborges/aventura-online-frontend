import { configureStore } from '@reduxjs/toolkit';
import profileDataReducer from '../features/profileDataSlice';
import authDataReducer from '../features/authSlice';
import newCharacterReducer from '../features/newCharacter';

export const store = configureStore({
    reducer: {
        profileData: profileDataReducer,
        auth: authDataReducer,
        newCharacter: newCharacterReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: false
        }
    ),
});

export type RootState = ReturnType<typeof store.getState>;