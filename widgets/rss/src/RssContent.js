import React from 'react'
import axios from 'axios'
import AutoScroll from '../../../components/AutoScroll'

const DEFAULT_UPDATE_INTERVAL = 60000 // 1 minute
const DEFAULT_ITEMS_TO_SHOW = 5
const CORS_PROXY = 'https://api.allorigins.win/raw?url='
const RSS_URL = 'https://www.ynet.co.il/Integration/StoryRss1854.xml'

class RssContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: []
    }
  }

  fetchNews = async () => {
    const { data = {} } = this.props
    const { itemsToShow = DEFAULT_ITEMS_TO_SHOW } = data
    try {
      const response = await axios.get(CORS_PROXY + encodeURIComponent(RSS_URL))
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(response.data, 'text/xml')
      const items = xmlDoc.querySelectorAll('item')
      const newsItems = Array.from(items)
        .slice(0, itemsToShow)
        .map(item => ({
          title: (item.querySelector('title') || {}).textContent
        }))
      this.setState({ news: newsItems })
    } catch (error) {
      console.error('Error fetching RSS:', error)
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
      fontSize = 16,
      widgetHeight = 100
    } = data
    const { news } = this.state

    return (
      <div className="rss-widget" style={{ height: `${widgetHeight}px` }}>
        <div className="ynet-logo">
          <img src="https://www.ynet.co.il/images/favicon/favicon_1.ico" alt="Ynet" />
        </div>
        <div className="content-wrapper">
          <AutoScroll style={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center', minHeight: '100%' }}>
            {news.map((item, index) => (
              <div key={index} className="news-item">
                <h3>{item.title}</h3>
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
          .ynet-logo {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 2;
          }
          .ynet-logo img {
            width: 24px;
            height: 24px;
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
          }
          .content-wrapper {
            width: 100%;
            height: 100%;
            min-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .news-item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 80px;
            padding: 0 30px;
            border-right: 2px solid rgba(255, 255, 255, 0.2);
            white-space: nowrap;
            min-height: 100%;
          }
          .news-item:last-child {
            border-right: none;
          }
          h3 {
            font-size: ${fontSize}px;
            margin: 0;
            font-weight: 500;
            line-height: 1.2;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}

export default RssContent
