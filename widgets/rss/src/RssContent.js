import React from 'react'
import axios from 'axios'
import AutoScroll from '../../../components/AutoScroll'

const DEFAULT_UPDATE_INTERVAL = 300000 // 5 minutes
const DEFAULT_ITEMS_TO_SHOW = 5
const CORS_PROXY = 'https://api.allorigins.win/raw?url='
const RSS_URL = 'https://www.ynet.co.il/Integration/StoryRss2.xml'

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
          title: (item.querySelector('title') || {}).textContent,
          description: (item.querySelector('description') || {}).textContent,
          link: (item.querySelector('link') || {}).textContent
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
      fontSize = 16
    } = data
    const { news } = this.state

    return (
      <div className="rss-widget">
        <AutoScroll style={{ display: 'block' }}>
          {news.map((item, index) => (
            <div key={index} className="news-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </AutoScroll>
        <style jsx>{`
          .rss-widget {
            height: 100%;
            width: 100%;
            background-color: ${backgroundColor};
            color: ${textColor};
            padding: 16px;
            font-family: 'Open Sans', sans-serif;
            overflow: hidden;
          }
          .news-item {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .news-item:last-child {
            border-bottom: none;
          }
          h3 {
            font-size: ${fontSize}px;
            margin: 0 0 10px 0;
          }
          p {
            font-size: ${fontSize - 2}px;
            margin: 0;
            opacity: 0.8;
          }
        `}</style>
      </div>
    )
  }
}

export default RssContent
