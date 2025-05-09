import React, { useEffect, useState } from 'react'

const WeatherContent = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=32.0853&longitude=34.7818&current_weather=true')
        const data = await response.json()
        setWeatherData(data.current_weather)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching weather data:', error)
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  if (loading) {
    return (
      <div className="weather-widget">
        <div className="loading">טוען...</div>
        <style jsx>{`
          .weather-widget {
            width: 100%;
            height: 100%;
    script.onload = initWidget
    document.body.appendChild(script)

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      const existingScript = document.getElementById('weatherwidget-io-js')
      if (existingScript) {
        existingScript.remove()
      }
      delete window.__weatherwidget_init
    }
  }, [])

  return (
    <div className="weather-container" ref={containerRef}>
      <style jsx>{`
        .weather-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          overflow: hidden;
        }

        :global(.weatherwidget-io) {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }

        :global(.weatherwidget-io iframe) {
          width: 100% !important;
          height: 100% !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>
    </div>
  )
}

export default WeatherContent
