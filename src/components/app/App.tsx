import { useEffect } from 'react'
import {getCurrentLocation} from './appSlice'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import SearchBar from '../searchBar/SearchBar'
import WeatherContainer from '../weatherContainer/WeatherContainer'
import LanguageBar from '../languageBar/LanguageBar'

import './app.scss'
 

const App: React.FC = () => {

  const dispatch = useAppDispatch()
  const { language } = useAppSelector(state => state.appReducer) 

  useEffect(() =>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        dispatch(getCurrentLocation({ latitude, longitude }))
      });
    }
  }, [])

  return (
    <div className={`app ${language === 'he' ? 'hebrewClass' : ''}`}>
      <LanguageBar />
      <SearchBar />
      <WeatherContainer />
    </div>
  );
}

export default App;
