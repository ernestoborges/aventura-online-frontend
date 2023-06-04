import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { IRace } from './models/Race';
import { ISubrace } from './models/Subrace';
import { ITrait } from './models/Trait';


export interface IDndApiData {
    races: IRace[]
    subraces: ISubrace[]
    traits: ITrait[]
}

const initialState: IDndApiData = {
    races: [],
    subraces: [],
    traits: [],
};

export const dndApiDataSlice = createSlice({
    name: 'dndApiData',
    initialState,
    reducers: {
        setDndApiRacesData: (state, action) => {
            return { ...state, races: action.payload };
        },
        setDndApiSubracesData: (state, action) => {
            return { ...state, subraces: action.payload };
        },
        setDndApiTraitsData: (state, action) => {
            return { ...state, traits: action.payload };
        },
    },
})

export const { setDndApiRacesData, setDndApiSubracesData, setDndApiTraitsData } = dndApiDataSlice.actions;
export const getDndApiData = (state: RootState) => state.dndApiData;
export const getRaceList = (state: RootState) => state.dndApiData.races;
export const getSubraceList = (state: RootState) => state.dndApiData.subraces;
export const getTraitList = (state: RootState) => state.dndApiData.traits;

export default dndApiDataSlice.reducer;
