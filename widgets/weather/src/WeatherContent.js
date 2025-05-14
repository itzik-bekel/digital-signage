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
    widget.setAttribute('data-theme', 'dark')
    widget.setAttribute('data-basecolor', 'rgba(0,0,0,0)') // Transparent base for our gradient
    widget.setAttribute('data-textcolor', '#ffffff')
    widget.setAttribute('data-highcolor', '#ffffff')
    widget.setAttribute('data-lowcolor', '#daeaff')
    widget.setAttribute('data-suncolor', '#fff0a8')
    widget.setAttribute('data-mooncolor', '#daeaff')
    widget.setAttribute('data-cloudcolor', '#ffffff')
    widget.setAttribute('data-raincolor', '#92e5ff')
    widget.setAttribute('data-snowcolor', '#ffffff')
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
      // Safe cleanup of weather widget init
      if (window && window.__weatherwidget_init) {
        try {
          window.__weatherwidget_init = undefined
        } catch (e) {
          console.warn('Could not clean up weather widget:', e)
        }
      }
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
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          background: linear-gradient(90deg, rgb(26, 37, 69) 0%, #00c2ff 100%);
          font-family: 'Heebo', sans-serif;
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
          border-radius: 12px !important;
          overflow: hidden !important;
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
          border-radius: 12px !important;
        }

        :global(.weatherwidget-io *) {
          font-family: 'Heebo', sans-serif !important;
        }

        :global(@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&display=swap'));
      `}</style>
    </div>
  )
}

export default WeatherContent
