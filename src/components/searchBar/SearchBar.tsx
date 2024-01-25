import { FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setDataCitiesWeather } from '../weatherContainer/weatherSlice'
import { useTranslation } from 'react-i18next';
import type { WeatherData } from '../../types/weatherCities';
import { useAddToLocalStorage } from '../../hooks/useAddToLocalStorage';

import './searchBar.scss'


const SearchBar: React.FC = () =>{

    const [ inputValue, setInputValue ] = useState<string>('')

    const dispatch = useAppDispatch()

    const {t} = useTranslation()

    const addLocalStorage = useAddToLocalStorage

    async function searchCity(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        try {
            if (inputValue) {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=f80f6c11a9160251a7d143b753775294&units=metric`)

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
        setInputValue('')
    }
    return(
        <div className='searchBarContainer'>
            <form className='searchBarForm' onSubmit={e => searchCity(e)}>
                <input type="text" className='searchBarInput' placeholder={t('translation:Search')} 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)}/>
                <button className='searchBarButton'>{t('translation:Add')}</button>
            </form>

            <div className='searchBarSearchingItems'></div>
        </div>
    )
}

export default SearchBar