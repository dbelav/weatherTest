import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import GraphCard from "../graphCard/GraphCard";
import { switchUnitDegrees, deleteCitiesWeather } from "../weatherContainer/weatherSlice";
import useSwitchUnitDegrees from '../../hooks/useSwitchUnitDegrees'
import CloseIcon from "../../assets/CloseIcon";
import { useTranslation } from 'react-i18next';
import type { WeatherData, WeatherGraph, UnitDeegrees } from "../../types/weatherCities";
import { API_KEY } from "../../store/apiKey";

import "./weatherCard.scss";


const WeatherCard: React.FC<{ data: WeatherData }> = ({ data }) => {

    const [graph, setGraph] = useState<WeatherGraph[]>([])

    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    
    const {unitDegrees} = useAppSelector(state => state.weatherCitiesReducer)

    const dtDate = new Date(data.dt * 1000)
    const formattedDate = format(dtDate, "EEE, d MMMM, HH:mm", {
        locale: enUS,
    });
 
    async function getDataGraph() {
        try {
            if (data.name) {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${API_KEY}&units=metric`
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP error! Status: ${response.status}`
                    );
                }
                const graphData = await response.json()

                setGraph(graphData.list.filter((_: any, index: number) => index % 5 === 0))
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    function deleteCard(){
        dispatch(deleteCitiesWeather(data.name))

        const existingDataString = localStorage.getItem('citiesData');
        const existingData = existingDataString ? JSON.parse(existingDataString) : [];
        const updatedData = existingData.filter((item: WeatherData) => item.name !== data.name);
        
        localStorage.setItem('citiesData', JSON.stringify(updatedData));
    }

    function swithUnit(unit: UnitDeegrees){
        dispatch(switchUnitDegrees(unit))
        localStorage.setItem('unit', JSON.stringify(unit))
    }

    useEffect(() => {
        getDataGraph()
        const getLangLocalStorage = localStorage.getItem('unit')
        const parseLangData = getLangLocalStorage ? JSON.parse(getLangLocalStorage) : null
        if(parseLangData){
            dispatch(switchUnitDegrees(parseLangData))
        }
        
    }, []);

    const setStylesButtonCelsius = 
        unitDegrees === 'celsius' ? 
        'buttonDegreesActive' :
        'buttonDegreesInactive'

    const setStylesButtonFahrenheit = 
        unitDegrees === 'fahrenheit' ? 
        'buttonDegreesActive' :
        'buttonDegreesInactive'

    const switchIconDegrees = unitDegrees === 'celsius' ? '°C' : '°F'

    return (
        <div className="weatherCardContainer">
            <button className="closeIcon" onClick={() => deleteCard()}>
                <CloseIcon/>
            </button>
            
            <div className="weatherCardContainerInner">
                <div className="weatherCardHeader">
                    <div className="weatherCardHeaderLeft">
                        <div className="weatherCardHeaderLeftCity">
                            {data.name}
                        </div>
                        <div className="weatherCardHeaderLeftDate">
                            {formattedDate}
                        </div>
                    </div>
                    <div className="weatherCardHeaderRight">
                        <div className="weatherCardHeaderRightIcon"></div>
                        <span className="weatherCardHeaderRightTitle">
                            {data.weather[0].main}
                        </span>
                    </div>
                </div>
                <div className="weatherCardChart">
                    <GraphCard graphData={graph}/>
                </div>

                <div className="weatherCardFooter">
                    <div className="weatherCardFooterLeft">
                        <div className="weatherCardFooterLeftDeegresFirstContainer">
                            <span className="weatherCardFooterLeftDeegresTitle">
                                {useSwitchUnitDegrees(data.main.temp)}
                            </span>
                            <div className="weatherCardFooterLeftDeegresSwap">
                                <button className={`weatherCardFooterLeftDeegresSwapButton ${setStylesButtonCelsius}`}
                                onClick={() => swithUnit('celsius')}>
                                    °C
                                </button>
                                <div className="weatherCardFooterLeftDeegresSwapPipe"></div>
                                <button className={`weatherCardFooterLeftDeegresSwapButton ${setStylesButtonFahrenheit}`}
                                onClick={() => swithUnit('fahrenheit')}>
                                    °F
                                </button>
                            </div>
                        </div>
                        <div className="weatherCardFooterLeftDeegresSecondContainer">
                            <span className="weatherCardFooterLeftDeegresFells">
                            {t('translation:Feels')}:
                                <strong>{useSwitchUnitDegrees(data.main.feels_like)}{switchIconDegrees}</strong>
                            </span>
                        </div>
                    </div>
                    <div className="weatherCardFooterRight">
                        <span className="weatherCardFooterRightTitle">
                        {t('translation:Wind')}: <strong>{data.wind.speed} m/s</strong>
                        </span>
                        <span className="weatherCardFooterRightTitle">
                        {t('translation:Humidity')}: <strong>{data.main.humidity}%</strong>
                        </span>
                        <span className="weatherCardFooterRightTitle">
                        {t('translation:Pressure')}: <strong>{data.main.pressure}Pa</strong>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
