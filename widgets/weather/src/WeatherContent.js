import React, { useEffect, useRef } from 'react'

const WeatherContent = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // Create widget container
    const widget = document.createElement('a')
    widget.className = 'weatherwidget-io'
    widget.href = 'https://forecast7.com/he/31d9734d79/rishon-letsiyon/'
    widget.setAttribute('data-label_1', 'חיל החימוש 20')
    widget.setAttribute('data-label_2', 'מזג אוויר')
    widget.setAttribute('data-theme', 'sky')
    widget.textContent = 'חיל החימוש 20 מזג אוויר'

    // Add widget to container
    containerRef.current.appendChild(widget)

    // Load widget script
    const script = document.createElement('script')
    script.src = 'https://weatherwidget.io/js/widget.min.js'
    script.id = 'weatherwidget-io-js'
    script.async = true

    const initWidget = () => {
      if (window.__weatherwidget_init) {
        window.__weatherwidget_init()
      }
    }

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
