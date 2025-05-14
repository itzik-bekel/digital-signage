import BaseWidget from '../base_widget'
import RssContent from './src/RssContent'
import RssOptions from './src/RssOptions'

export default class RssWidget extends BaseWidget {
  constructor() {
    super({
      name: 'RSS Feed',
      version: '0.2',
      icon: ['fas', 'rss'],
      defaultData: {
        updateInterval: 300000,
        itemsToShow: 5,
        textColor: '#ffffff',
        backgroundColor: '#2d3436',
        fontSize: 32,        // Significantly increased
        timeSize: 32        // Matched with news text
      }
    })
  }

  get Widget() {
    return RssContent
  }

  get Options() {
    return RssOptions
  }
}
