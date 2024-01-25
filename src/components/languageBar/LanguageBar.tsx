import Select from 'react-select'
import { useEffect } from 'react';
import LanguageIcon from '../../assets/LanuageIcon'
import { setLanguage } from '../app/appSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { StylesConfig } from 'react-select'

import './languageBar.scss';


const LanguageBar: React.FC = () => {

  const dispatch = useAppDispatch()

  const {language} = useAppSelector(state => state.appReducer)
  
  const options = [
    { value: 'EN', label: 'EN' },
    { value: 'UA', label: 'UA' },
    { value: 'HE', label: 'HE' },
  ];

  function setLangHandle(e: any){
    localStorage.setItem('lang', JSON.stringify(e.value.toLowerCase()))
    dispatch(setLanguage(e.value.toLowerCase()))
  }

  useEffect(() =>{
    const getLangLocalStorage = localStorage.getItem('lang')
    const parseLangData = getLangLocalStorage ? JSON.parse(getLangLocalStorage) : null
    if(parseLangData){
      dispatch(setLanguage(parseLangData))
    }
  },[])

  return (
    <div className="languageBar">
      <LanguageIcon />
      <Select
        options={options}
        styles={customStyles}
        placeholder={language.toUpperCase()}
        onChange={e => setLangHandle(e)}
      />
    </div>
  );
};

const customStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      border: 'none',
      fontSize: '16px',
      lineHeight: '23px',
      width: '71px',
      height: '23px',
      textAlign: 'right',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      boxShadow: 'none',
      justifyContent: 'flex-end'
    }),
    indicatorSeparator: () => ({
        display: 'none',
        padding: '0'
    }),
    indicatorsContainer: () => ({
        padding: '0'
    }),
    singleValue: () => ({
        color: '#AFAFAF',
        font: 'normal normal normal 16px/23px Jost',
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      textAlign: 'left',
      backgroundColor: isFocused ? '#F2F2F2' : 'transparent',
      color: '#000',
      border: 'none'
    }),
    valueContainer: () => ({
        padding: '0'
    }),
    input: () => ({
        display: 'none',
    }),
    menu: () => ({
        boxShadow: '0px 3px 6px #00000029',
    }),
  };

export default LanguageBar;
