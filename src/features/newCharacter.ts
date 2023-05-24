import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store';


export interface INewCharacter {
    avatar_file: {
        name: string
        size: number
        type: string
    } | null
    name: string
    race: string
    characterClass: string
}

const initialState: INewCharacter = {
    avatar_file: null,
    name: "",
    race: "",
    characterClass: "",
};

export const newCharacterSlice = createSlice({
    name: 'newCharacter',
    initialState,
    reducers: {
        setNewCharacter: (state, action) => {
            
            return { ...state, ...action.payload };
        },
    },
})

export const { setNewCharacter } = newCharacterSlice.actions;
export const getNewCharacter = (state: RootState) => state.newCharacter;

export default newCharacterSlice.reducer;
