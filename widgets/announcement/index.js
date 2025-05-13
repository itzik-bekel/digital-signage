import BaseWidget from '../base_widget'
import AnnouncementContent from './src/AnnouncementContent'
import AnnouncementOptions from './src/AnnouncementOptions'

export default class Announcement extends BaseWidget {
  constructor() {
    super({
      name: 'Announcement',
      version: '0.1',
      icon: 'exclamation-triangle',
      defaultData: {
        headline: 'ברוכים הבאים לחיל החימוש 20',
        iconUrl: 'https://th.bing.com/th/id/OIP.vL-OqvfwluEegJV6KunAugHaHa?w=188&h=187&c=7&r=0&o=5&pid=1.7',
        gradientStart: 'rgb(26, 37, 69)',
        gradientEnd: '#00c2ff',
        textColor: '#ffffff',
        dateColor: '#ffffff',
        timeColor: '#ffffff',
        showIcon: true,
        showDate: true,
        textShadow: true,
        fontSize: {
          headline: 36,
          time: 36,
          date: 15
        }
      }
    })
  }

  get Widget() {
    return AnnouncementContent
  }

  get Options() {
    return AnnouncementOptions
  }
}
