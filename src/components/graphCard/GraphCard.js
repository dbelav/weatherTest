import { format, parseISO } from 'date-fns'
import { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  ResponsiveContainer,
  Label,
  ReferenceLine,
  YAxis
} from "recharts"
import { useAppSelector } from '../../hooks/reduxHooks'

import "./graphCard.scss";


const GraphCard = ({ graphData }) => {

  const [ dataGraphState, setDataGraphState ] = useState([])

  const { unitDegrees } = useAppSelector(state => state.weatherCitiesReducer)
  const { language } = useAppSelector(state => state.appReducer)

  function switchUnit(number){
    if(unitDegrees === 'celsius'){
      number = Math.round(number)
      if(number > 0){
          return `+${number}`
      } else{
          return number
      }
    } else {
      return Math.round((number * 9 / 5) + 32)
    }
  }

  const chartData = () => {
    const transformedData = graphData.map((data) => ({
        dt_txt: format(parseISO(data.dt_txt), 'dd.MM'),
        temperature: switchUnit(data.main.temp),
    }))

    if (language === 'he') {
      transformedData.reverse()
    }

    setDataGraphState(transformedData)
  }

  useEffect(() =>{
    chartData()
  }, [unitDegrees, language, graphData])

  const temperatures = dataGraphState.map(data => data.temperature)
  const minTemperature = Math.min(...temperatures)
  const maxTemperature = Math.max(...temperatures)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={300}
        height={300}
        data={dataGraphState}
        margin={{
          top: 10,
          right: 3,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFA25B" />
            <stop offset="100%" stopColor="#FFF4F4" />
          </linearGradient>
        </defs>
        <YAxis domain={[minTemperature-1, maxTemperature+1]} hide />
        <XAxis dataKey="dt_txt" interval={0}/>
        <Area
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"  
          fill="url(#colorGradient)"
          fillOpacity={0.3}
        />

        {dataGraphState.map((entry, index) => (        
          <ReferenceLine key={`reference-line-${index}`} x={index}  stroke='transparent' >
            <Label value={entry.temperature} position="top" className="labelBottom"/>
          </ReferenceLine>      
        ))}
        
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default GraphCard;
