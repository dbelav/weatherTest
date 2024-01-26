import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import type { CitiesWeatherData, WeatherData, UnitDeegrees } from "../../types/weatherCities"


const initialState: CitiesWeatherData = {
    citiesWeather: [],
    unitDegrees: 'celsius'
}

const weatherItems = createSlice({
    name: "weatherItems",
    initialState,
    reducers: {
        setDataCitiesWeather: (state, action: PayloadAction<WeatherData>) => {
            const checkRepeatCities = state.citiesWeather.find(city => city.name === action.payload.name)
            if(!checkRepeatCities){
                state.citiesWeather.push(action.payload)
            }              
        },
        switchUnitDegrees: (state, action: PayloadAction<UnitDeegrees>) => {
            state.unitDegrees = action.payload
        },
        deleteCitiesWeather: (state, action: PayloadAction<string>) =>{
            state.citiesWeather = state.citiesWeather.filter(city => city.name !== action.payload)
        }
    }
})

const { actions, reducer } = weatherItems

export default reducer

export const { setDataCitiesWeather,
    switchUnitDegrees,
    deleteCitiesWeather } = actions
