import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

import WeatherIcon from './WeatherIcon'

const DEFAULT_UNIT = 'metric'
const API_KEY = 'da6ef4bf43eed800fdadd4a728766089'
const API_URL = 'http://api.openweathermap.org/data/2.5'
const CITY_ID = '293703' // Rishon LeZion, IL
const DAYS_OF_WEEK = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

class WeatherContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: {},
      forecast: []
    }
  }

  componentDidMount() {
    const { data: { unit = DEFAULT_UNIT } = {} } = this.props
    this.fetchWeather(unit)
    // Update weather every 30 minutes
    this.interval = setInterval(() => this.fetchWeather(unit), 1800000)
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  fetchWeather = async (unit) => {
    try {
      // Get current weather
      const currentRes = await axios.get(
        `${API_URL}/weather?id=${CITY_ID}&appid=${API_KEY}&units=${unit}`
      )
      
      // Get 5-day forecast
      const forecastRes = await axios.get(
        `${API_URL}/forecast?id=${CITY_ID}&appid=${API_KEY}&units=${unit}`
      )

      const current = {
        temp: Math.round(currentRes.data.main.temp),
        icon: currentRes.data.weather[0].icon,
        description: currentRes.data.weather[0].description
      }

      // Group forecast by day and get max/min temps
      const dailyForecasts = {}
      forecastRes.data.list.forEach(item => {
        const date = new Date(item.dt * 1000)
        const day = date.getDay()
        
        if (!dailyForecasts[day]) {
          dailyForecasts[day] = {
            day: DAYS_OF_WEEK[day],
            temps: [],
            icons: new Set()
          }
        }
        
        dailyForecasts[day].temps.push(item.main.temp)
        dailyForecasts[day].icons.add(item.weather[0].icon)
      })

      // Process daily forecasts
      const forecast = Object.values(dailyForecasts)
        .slice(1, 6) // Next 5 days, excluding today
        .map(day => ({
          day: day.day,
          maxTemp: Math.round(Math.max(...day.temps)),
          minTemp: Math.round(Math.min(...day.temps)),
          icon: Array.from(day.icons)[0] // Use most common icon
        }))

      this.setState({ current, forecast })
    } catch (error) {
      console.error('Error fetching weather:', error)
    }
  }

  render() {
    const { current, forecast } = this.state

    return (
      <div className='weather'>
        <div className='current'>
          <div className='bgicon'>
            <WeatherIcon icon={current.icon} />
          </div>
          <div className='info'>
            <div className='temp'>{current.temp}°</div>
            <div className='desc'>{current.description}</div>
            <div className='location'>
              <div className='marker'>
                <FontAwesomeIcon icon={faMapMarker} size='xs' fixedWidth />
              </div>
              <div className='name'>Rishon LeZion</div>
            </div>
          </div>
          <div className='icon'>
            <WeatherIcon icon={current.icon} />
          </div>
        </div>
        <div className='forecast'>
          {forecast.map((day, index) => (
            <div key={index} className='day'>
              <div className='name'>{day.day}</div>
              <div className='icon'>
                <WeatherIcon icon={day.icon} />
              </div>
              <div className='temps'>
                <span className='max'>{day.maxTemp}°</span>
                <span className='min'>{day.minTemp}°</span>
              </div>
            </div>
          ))}
        </div>
        <style jsx>{`
          .weather {
            position: relative;
            box-sizing: border-box;
            height: 100%;
            width: 100%;
            background: #358aed;
            flex: 1;
            padding: 16px;
            font-family: 'Open Sans', sans-serif;
            display: flex;
            flex-direction: column;
          }
          .current {
            flex: 1;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            position: relative;
          }
          .forecast {
            display: flex;
            justify-content: space-around;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }
          .icon {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            transform: scale(2);
            transform-origin: top right;
          }
          .info .temp {
            font-family: 'Open Sans', sans-serif;
            font-size: 48px;
            line-height: 38px;
            margin-bottom: 4px;
          }
          .info .desc {
            font-family: 'Open Sans', sans-serif;
            font-size: 14px;
            text-transform: capitalize;
            margin-bottom: 4px;
          }
          .bgicon {
            position: absolute;
            right: 20px;
            top: 0px;
            transform: scale(5) rotate(-5deg);
            opacity: 0.3;
          }
          .location {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .location .name {
            font-family: 'Open Sans', sans-serif;
            font-size: 12px;
            text-transform: capitalize;
          }
          .location .marker {
            margin-right: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .day {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 10px;
          }
          .day .name {
            font-size: 14px;
            margin-bottom: 8px;
          }
          .day .icon {
            transform: scale(1);
            margin: 5px 0;
          }
          .day .temps {
            display: flex;
            gap: 8px;
            font-size: 14px;
          }
          .day .max {
            font-weight: bold;
          }
          .day .min {
            opacity: 0.8;
          }
        `}</style>
      </div>
    )
  }
}

export default WeatherContent
