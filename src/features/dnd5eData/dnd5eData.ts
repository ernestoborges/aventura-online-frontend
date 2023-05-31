import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { IRace } from './models/Race';
import { ISubrace } from './models/Subrace';


export interface IDndApiData {
    races: IRace[]
    subraces: ISubrace[]
}

const initialState: IDndApiData = {
    races: [],
    subraces: []
};

export const dndApiDataSlice = createSlice({
    name: 'dndApiData',
    initialState,
    reducers: {
        setDndApiRaceData: (state, action) => {
            return { ...state, races: action.payload };
        },
        setDndApiSubraceData: (state, action) => {
            return { ...state, subraces: action.payload };
        },
    },
})

export const { setDndApiRaceData, setDndApiSubraceData } = dndApiDataSlice.actions;
export const getDndApiData = (state: RootState) => state.dndApiData;
export const getRaceList = (state: RootState) => state.dndApiData.races;
export const getSubraceList = (state: RootState) => state.dndApiData.subraces;

export default dndApiDataSlice.reducer;
