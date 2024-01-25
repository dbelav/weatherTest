import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { AppState, CurrentLocation } from "../../types/appTypes";
import i18n from '../../translate/i18n'


const initialState: AppState = {
    currentLocation: {
        latitude: null,
        longitude: null,
    },
    language: 'en'
};

const app = createSlice({
    name: "app",
    initialState,
    reducers: {
        getCurrentLocation: (state, action: PayloadAction<CurrentLocation>) => {
            state.currentLocation = action.payload;
        },
        setLanguage: (state, action: PayloadAction<string>) =>{
            state.language = action.payload
            i18n.changeLanguage(action.payload);
        }
    },
});

const { actions, reducer } = app;

export default reducer

export const { getCurrentLocation,
    setLanguage } = actions
