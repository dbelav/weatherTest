import { configureStore } from '@reduxjs/toolkit'
import appSlice from '../components/app/appSlice'
import weatherSlice from '../components/weatherContainer/weatherSlice'


const store = configureStore({
    reducer: {
        appReducer: appSlice,
        weatherCitiesReducer: weatherSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store