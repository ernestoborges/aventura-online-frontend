import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { IRace } from './models/Race';
import { ISubrace } from './models/Subrace';
import { ITrait } from './models/Trait';
import { IClass } from './models/Class';


export interface IDndApiData {
    races: IRace[]
    subraces: ISubrace[]
    traits: ITrait[]
    classes: IClass[]
}

const initialState: IDndApiData = {
    races: [],
    subraces: [],
    traits: [],
    classes: [],
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
        setDndApiClassesData: (state, action) => {
            return { ...state, classes: action.payload };
        }
    },
})

export const { setDndApiRacesData, setDndApiSubracesData, setDndApiTraitsData, setDndApiClassesData } = dndApiDataSlice.actions;
export const getDndApiData = (state: RootState) => state.dndApiData;
export const getRaceList = (state: RootState) => state.dndApiData.races;
export const getSubraceList = (state: RootState) => state.dndApiData.subraces;
export const getTraitList = (state: RootState) => state.dndApiData.traits;
export const getClassList = (state: RootState) => state.dndApiData.classes;


export default dndApiDataSlice.reducer;
