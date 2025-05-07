import BaseWidget from '../base_widget'
import RssContent from './src/RssContent'
import RssOptions from './src/RssOptions'

export default class RssWidget extends BaseWidget {
  constructor() {
    super({
      name: 'RSS Feed',
      version: '0.1',
      icon: ['fas', 'rss'], // FontAwesome RSS icon
      defaultData: {
        updateInterval: 300000,
        itemsToShow: 5,
        textColor: '#ffffff',
        backgroundColor: '#2d3436',
        fontSize: 16
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
