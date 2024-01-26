import WeatherCard from "../weatherCard/WeatherCard"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { setDataCitiesWeather } from "./weatherSlice"
import { API_KEY } from "../../store/apiKey"
import type { WeatherData } from "../../types/weatherCities"
import { useAddToLocalStorage } from "../../hooks/useAddToLocalStorage"

import "./weatherContainer.scss";


const WeatherContainer: React.FC = () => {
    const dispatch = useAppDispatch()
    const addLocalStorage = useAddToLocalStorage
    const { citiesWeather } = useAppSelector(
        (state) => state.weatherCitiesReducer
    )

    const { currentLocation } = useAppSelector((state) => state.appReducer)

    useEffect(() => {
        async function getData() {
            const dataLocalStorage = localStorage.getItem('citiesData')

            if(dataLocalStorage){         
                const parsedData = await JSON.parse(dataLocalStorage);
                parsedData.map((item: WeatherData) => dispatch(setDataCitiesWeather(item)))
            } else{
                try {
                    if (currentLocation.latitude && currentLocation.longitude) {
                        const response = await fetch(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${API_KEY}&units=metric`
                        )
    
                        if (!response.ok) {
                            throw new Error(
                                `HTTP error! Status: ${response.status}`
                            )
                        }
                        const data = await response.json()

                        dispatch(setDataCitiesWeather(data))
                        addLocalStorage(data)
                    }
                } catch (error) {
                    console.error("Error fetching data:", error)
                }
            }   
        }
        getData()
    }, [currentLocation])

    function renderCities() {
        return citiesWeather.map((item) => {
            return <WeatherCard data={item} key={item.name}/>
        })
    }

    return (
        <div className="weatherContainer">
            {renderCities()}
            <div className="weatherContainerInvisibleBlock"></div> {/* For normal display */}
            <div className="weatherContainerInvisibleBlock"></div> {/* For normal display */}
            <div className="weatherContainerInvisibleBlock"></div> {/* For normal display */}
        </div>
    );
};

export default WeatherContainer;
