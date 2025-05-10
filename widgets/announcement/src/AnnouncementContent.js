import React from 'react'

const AnnouncementContent = () => {
  const now = new Date()

  const date = new Intl.DateTimeFormat('he-IL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(now)

  const time = now.toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  return (
    <div className="widget">
      {/* background image */}
      <div className="background-wrapper">
        <div className="background"></div>
      </div>

      {/* top banner */}
      <header className="banner">
        <div className="left">
          <span className="time">{time}</span>
          <span className="date">{date}</span>
        </div>

        <h1 className="headline">ברוכים הבאים לחיל החימוש 20</h1>

        <div className="right">
          <img
            src="https://th.bing.com/th/id/OIP.vL-OqvfwluEegJV6KunAugHaHa?w=188&h=187&c=7&r=0&o=5&pid=1.7"
            alt="icon"
            className="icon"
          />
        </div>
      </header>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@500;800&display=swap');
      `}</style>

      <style jsx>{`
        .widget {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          font-family: 'Heebo', sans-serif;
          position: relative;
        }

        .background-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: linear-gradient(90deg,rgb(26, 37, 69) 0%, #00c2ff 100%);
          color: #fff;
          height: 80px;
          position: relative;
          z-index: 1;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 140px;
        }

        .time {
          font-size: 36px;
          font-weight: 800;
          line-height: 1;
        }

        .date {
          font-size: 15px;
          font-weight: 500;
          margin-top: 2px;
        }

        .headline {
          flex: 1;
          text-align: center;
          font-size: 36px;
          font-weight: 900;
          margin: 2;
          white-space: nowrap;
          padding: 0 20px;
          text-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
        }

        .right {
          min-width: 200px;
          text-align: right;
        }

        .icon {
          width: 50px;
          height: 50px;
          object-fit: contain;
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
}

export default AnnouncementContent
