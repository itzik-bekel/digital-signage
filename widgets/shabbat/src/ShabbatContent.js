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
        <div className="time-item">
          <span className="label">הַדְלָקַת נֵרוֹת:</span>
          <span className="time">&nbsp;&nbsp;{shabbatTimes.candleLighting}</span>
        </div>
        <div className="time-item">
          <span className="label">הַבְדָּלָה:</span>
          <span className="time">&nbsp;&nbsp;{shabbatTimes.havdalah}</span>
        </div>
      </div>
      <style jsx>{`
        .shabbat-widget {
          width: 100%;
          height: 100%;
          position: relative;
          color: #fff;
          padding: 20px;
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
          background-image: url('https://www.jdn.co.il/wp-content/uploads/2022/02/%D7%A0%D7%A8-%D7%A0%D7%A9%D7%9E%D7%94-%D7%92%D7%99%D7%A3.gif');
          background-size: cover;
          background-position: center;
          z-index: -1;
          opacity: 0.8;
        }

        .title {
          font-size: 36px;
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 30px;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
        }

        .times {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: flex-start;
          background: rgba(0, 0, 0, 0.7);
          padding: 20px 30px;
          border-radius: 15px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
        }

        .time-item {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 350px;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
        }

        .label {
          font-weight: bold;
        }

        .time {
          margin-left: auto;
        }
      `}</style>
    </div>
  )
}

export default ShabbatContent
