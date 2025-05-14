import BaseWidget from '../base_widget'
import ListContent from './src/ListContent'
import ListOptions from './src/ListOptions'

export default class List extends BaseWidget {
  constructor() {
    super({
      name: 'List',
      version: '0.2',           // bumped version for redesigned widget
      icon: 'list',
      defaultData: {
        /* global settings */
        rotationSec: 10,        // seconds each table is displayed (0 = no rotation)
        color: '#34495e',
        textColor: '#ffffff',

        /* array of tables – each table will be rotated on screen */
        tables: [
          {
            title: 'טבלת ברירת מחדל',
            /* up-to-34 people.  Each object represents 1 column */
            people: [
              /* { apt: 1, name: '', missing: '' } */
            ]
          }
        ]
      }
    })
  }

  get Widget() {
    return ListContent
  }

  get Options() {
    return ListOptions
  }
}
