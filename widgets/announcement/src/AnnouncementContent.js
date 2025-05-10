import React from 'react'

const AnnouncementContent = () => {
  const now = new Date()

  // Hebrew date + time (no seconds)
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
      {/* time + date pill */}
      <div className="pill">
        <span className="clock">{time}</span>
        <span className="calendar">{date}</span>
      </div>

      {/* welcome headline centred horizontally */}
      <h1 className="headline">ברוכים הבאים לחיל החימוש&nbsp;20</h1>

      {/* icon */}
      <img
        src="https://example.com/cool-icon.png"
        alt="icon"
        className="icon"
      />

      <style jsx>{`
        .widget {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 220px;
          background: radial-gradient(circle at top left,#e3e7ff 0%,#c5d3ff 40%,#edf0ff 100%);
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(118, 142, 189, 0.15);
          overflow: hidden;
          font-family: 'Segoe UI', 'Open Sans', sans-serif;
        }

        /* pill with time/date */
        .pill{
          position: absolute;
          top: 6px;
          left: 6px;
          background: #3059d6;
          border-radius: 14px;
          padding: 5px 10px;
          text-align: center;
          color: #fff;
          min-width: 160px;
          box-shadow: 0 2px 6px rgba(157, 138, 240, 0.25);
        }
        .clock{
          display: block;
          font-size: 40px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 1px;
          font-family: 'Roboto', sans-serif;
        }
        .calendar{
          display: block;
          margin-top: 4px;
          font-size: 14px;
          font-weight: 500;
        }

        /* headline */
        .headline{
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 32px;
          font-weight: 800;
          color:rgb(82, 101, 206);
          text-shadow: 0 3px 6px rgba(40, 123, 94, 0.2);
          white-space: nowrap;
        }

        /* icon top-right */
        .icon{
          position: absolute;
          top: 6px;
          right: 6px;
          width: 44px;
          height: 44px;
        }
      `}</style>
    </div>
  )
}

export default AnnouncementContent
