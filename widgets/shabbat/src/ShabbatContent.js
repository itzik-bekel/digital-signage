import React, { useEffect, useState } from 'react'

const ShabbatContent = () => {
  const [shabbatTimes, setShabbatTimes] = useState({ candleLighting: '', havdalah: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShabbatData = async () => {
      try {
        const response = await fetch(
          'https://www.hebcal.com/shabbat?cfg=json&geonameid=293703&b=18&M=on'
        )
        const data = await response.json()

        const candleItem = data.items.find(item => item.category === 'candles')
        const havdalahItem = data.items.find(item => item.category === 'havdalah')

        const candleLighting = candleItem ? new Date(candleItem.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false }) : ''
        const havdalah = havdalahItem ? new Date(havdalahItem.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false }) : ''

        setShabbatTimes({ candleLighting, havdalah })
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Shabbat data:', error)
        setLoading(false)
      }
    }

    fetchShabbatData()
  }, [])

  if (loading) {
    return (
      <div className="shabbat-widget">
        <div className="loading">טוען...</div>
        <style jsx>{`
          .shabbat-widget {
            width: 100%;
            height: 100%;
            background: linear-gradient(160deg, #f0f0f0 0%, #e0e0e0 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Open Sans', sans-serif;
          }
          .loading {
            font-size: 18px;
            opacity: 0.8;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="shabbat-widget">
      <div className="background-image"></div>
      <h1 className="title">שׁבת שלום</h1>
      <div className="times">
        <div className="times-grid">
          <span className="label">כניסת שבת:</span>
          <span className="time">{shabbatTimes.candleLighting}</span>
          <span className="label">צאת שבת:</span>
          <span className="time">{shabbatTimes.havdalah}</span>
        </div>
      </div>
      <style jsx>{`
        .shabbat-widget {
          width: 100%;
          height: 100%;
          position: relative;
          color: #fff;
          padding: 20px 40px 20px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          font-family: 'Open Sans', sans-serif;
          border-radius: 10px;
          overflow: hidden;
          direction: rtl;
        }

        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('https://th.bing.com/th/id/OIP.pZTNhF73x-ZZUJwiyFPDjAHaFd?w=230&h=180&c=7&r=0&o=5&pid=1.7');
          background-size: cover;
          background-position: center;
          z-index: -1;
          opacity: 0.8;
        }

        .title {
          width: 100%;
          text-align: center;
          margin-left: auto;
          margin-right: 20px;
          font-size: 36px;
          font-weight: bold;
          margin-top: 0px;
          margin-bottom: 95px;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
        }

        .times {
          background: rgba(81, 74, 74, 0.7);
          padding: 15px 20px;
          border-radius: 15px;
          box-shadow: 0 6px 12px rgba(59, 51, 51, 0.5);
          margin: 0 auto;
          min-width: 220px;
        }

        .times-grid {
          display: grid;
          grid-template-columns: auto 70px;
          gap: 10px 15px;
          align-items: center;
          color: #fff;
        }

        .label {
          font-family: 'Heebo', 'Open Sans', sans-serif;
          font-size: 24px;
          font-weight: 600;
          text-align: right;
          white-space: nowrap;
          letter-spacing: 0.5px;
        }

        .time {
          font-family: 'Heebo', 'Open Sans', sans-serif;
          font-size: 24px;
          font-weight: 500;
          text-align: left;
          white-space: nowrap;
          letter-spacing: 0.5px;
          color: #ffffff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}

export default ShabbatContent
