import { useAppSelector } from "./reduxHooks"


const useSwitchUnitDegrees = (number : number) =>{

    const { unitDegrees } = useAppSelector(state => state.weatherCitiesReducer)

    if(unitDegrees === 'celsius'){
        number = Math.round(number)

        if(number > 0){
            return `+${number}`
        } else{
            return number
        }

    } else{
        return Math.round((number * 9 / 5) + 32)
    }
}

export default useSwitchUnitDegrees