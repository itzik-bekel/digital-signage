import React from 'react'

class AnnouncementContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '',
      date: ''
    }
  }

  updateDateTime = () => {
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

    this.setState({ date, time })
  }

  componentDidMount() {
    // Initial update
    this.updateDateTime()
    // Set up interval for updates
    this.interval = setInterval(this.updateDateTime, 60000) // Update every minute
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render() {
    const { time, date } = this.state
    const { data = {} } = this.props
    const {
      headline = 'ברוכים הבאים לחיל החימוש 20',
      iconUrl = 'https://th.bing.com/th/id/OIP.vL-OqvfwluEegJV6KunAugHaHa?w=188&h=187&c=7&r=0&o=5&pid=1.7',
      gradientStart = 'rgb(26, 37, 69)',
      gradientEnd = '#00c2ff',
      textColor = '#ffffff',
      dateColor = '#ffffff',
      timeColor = '#ffffff',
      showIcon = true,
      showDate = true,
      textShadow = true,
      fontSize = {
        headline: 36,
        time: 36,
        date: 15
      }
    } = data

    const shadowStyle = textShadow ? '0 4px 4px rgba(0, 0, 0, 0.2)' : 'none'

    return (
      <div className="widget">
        {/* background image */}
        <div className="background-wrapper">
          <div className="background"></div>
        </div>

        {/* top banner */}
        <header className="banner">
          {showDate && (
            <div className="left">
              <span className="time">{time}</span>
              <span className="date">{date}</span>
            </div>
          )}

          <h1 className="headline">{headline}</h1>

          {showIcon && (
            <div className="right">
              <img
                src={iconUrl}
                alt="icon"
                className="icon"
              />
            </div>
          )}
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
            padding: 4px 14px;
            background: linear-gradient(90deg, ${gradientStart} 0%, ${gradientEnd} 100%);
            color: ${textColor};
            height: 70px;
            position: relative;
            z-index: 1;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .left {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            min-width: ${showDate ? '140px' : '0'};
          }

          .time {
            font-size: ${fontSize.time}px;
            font-weight: 800;
            line-height: 1;
            color: ${timeColor};
            text-shadow: ${shadowStyle};
          }

          .date {
            font-size: ${fontSize.date}px;
            font-weight: 500;
            margin-top: 2px;
            color: ${dateColor};
            text-shadow: ${shadowStyle};
          }

          .headline {
            flex: 1;
            text-align: center;
            font-size: ${fontSize.headline}px;
            font-weight: 900;
            margin: ${!showDate && !showIcon ? '0' : '-4px 2px'};
            padding: ${!showDate && !showIcon ? '0' : '0 20px'};
            text-shadow: ${shadowStyle};
            color: ${textColor};
          }

          .right {
            min-width: ${showIcon ? '200px' : '0'};
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
}

export default AnnouncementContent
