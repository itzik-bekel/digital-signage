import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faRss, faGripVertical, faClock, faCalendarAlt, faSmile } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false
library.add(faRss)
library.add(faGripVertical)
library.add(faClock)
library.add(faCalendarAlt)
library.add(faSmile)

export const StatusBarElementTypes = {
  time: {
    name: 'time',
    icon: faClock,
    getData: () => {
      const now = new Date()
      const formattedDate = new Intl.DateTimeFormat('he-IL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(now)
      const formattedTime = now.toLocaleTimeString('he-IL', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      return `${formattedDate} ${formattedTime}`
    }
  },
  date: {
    name: 'date',
    icon: faCalendarAlt
  },
  spacer: {
    name: 'spacer',
    icon: faGripVertical
  },
  connection: {
    name: 'connection',
    icon: faRss
  },
  welcome: {
    name: 'welcome',
    icon: faSmile
  }
}
