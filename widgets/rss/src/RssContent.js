import React from 'react'
import axios from 'axios'
import AutoScroll from '../../../components/AutoScroll'

const DEFAULT_UPDATE_INTERVAL = 300000 // 5 minutes
const CORS_PROXY = 'https://api.allorigins.win/raw?url='
const RSS_URL = 'https://www.ynet.co.il/Integration/StoryRss1854.xml'

class RssContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
      isLoading: true
    }
  }

  processTitleText = (title) => {
    return title.replace(/["]/g, '״')
  }

  fetchNews = async () => {
    this.setState({ isLoading: true })
    try {
      const response = await axios.get(CORS_PROXY + encodeURIComponent(RSS_URL))
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(response.data, 'text/xml')
      const items = xmlDoc.querySelectorAll('item')
      
      const newsItems = Array.from(items)
        .map(item => {
          const pubDate = new Date(item.querySelector('pubDate').textContent)
          const time = pubDate.toLocaleTimeString('he-IL', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
          return {
            title: this.processTitleText(item.querySelector('title').textContent),
            time,
            pubDate
          }
        })
        .sort((a, b) => b.pubDate - a.pubDate)

      this.setState({ 
        news: newsItems,
        isLoading: false
      })
    } catch (error) {
      console.error('Error fetching RSS:', error)
      this.setState({ isLoading: false })
    }
  }

  componentDidMount() {
    const { data = {} } = this.props
    const { updateInterval = DEFAULT_UPDATE_INTERVAL } = data
    this.fetchNews()
    this.interval = setInterval(this.fetchNews, updateInterval)
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render() {
    const { data = {} } = this.props
    const {
      textColor = '#ffffff',
      backgroundColor = '#2d3436',
      fontSize = 32,
      timeSize = 22,
      widgetHeight = 100
    } = data
    const { news, isLoading } = this.state

    if (isLoading) {
      return (
        <div className="rss-widget loading" style={{ height: `${widgetHeight}px` }}>
          טוען חדשות...
        </div>
      )
    }

    return (
      <div className="rss-widget" style={{ height: `${widgetHeight}px` }}>
        <div className="ynet-logo">
          <img src="https://www.ynet.co.il/images/favicon/favicon_1.ico" alt="Ynet" />
        </div>
        <div className="content-wrapper">
          <AutoScroll 
            style={{ 
              display: 'flex', 
              whiteSpace: 'nowrap', 
              alignItems: 'center', 
              minHeight: '100%'
            }}
            duration={240}
          >
            {news.map((item, index) => (
              <div key={index} className="news-item">
                <span className="news-time">{item.time}</span>
                <span className="news-title" style={{ fontSize: `${timeSize}px` }}>{item.title}</span>
              </div>
            ))}
          </AutoScroll>
        </div>
        <style jsx>{`
          .rss-widget {
            width: 100%;
            position: relative;
            background-color: ${backgroundColor};
            color: ${textColor};
            font-family: 'Open Sans', sans-serif;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            font-family: 'Heebo', sans-serif;
          }

          .ynet-logo {
            position: absolute;
            top: 0px;  // Moved up for better alignment
            right: 15px;
            z-index: 2;
          }

          .ynet-logo img {
            width: 32px;
            height: 32px;
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
          }

          .content-wrapper {
            width: 100%;
            height: 100%;
            min-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
          }

          .news-item {
            display: inline-flex;
            align-items: center;
            gap: 35px;
            direction: rtl;
            margin-right: 140px;
            padding: 0 50px;
            border-right: 3px solid rgba(255, 255, 255, 0.3);
            min-height: 100%;
          }

          .news-item:last-child {
            border-right: none;
          }

          .news-time {
            color: #ff0000;
            font-weight: bold;
            font-size: ${timeSize}px;
            white-space: nowrap;
            text-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
          }

          .news-title {
            font-weight: 600;
            line-height: 1.4;
            text-align: right;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            white-space: nowrap;
          }
        `}</style>
      </div>
    )
  }
}

export default RssContent
