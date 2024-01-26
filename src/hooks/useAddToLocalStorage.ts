import type { WeatherData } from "../types/weatherCities";


export const useAddToLocalStorage = (data: WeatherData) =>{

    const existingDataString = localStorage.getItem('citiesData')
    const existingData: WeatherData[] = existingDataString ? JSON.parse(existingDataString) : []
    const isAlreadyAdded = existingData.some((item: WeatherData) => item.name === data.name)
    
    if (!isAlreadyAdded) {
        existingData.push(data)
        localStorage.setItem('citiesData', JSON.stringify(existingData))
    }
}