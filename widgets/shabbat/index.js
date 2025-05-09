import BaseWidget from '../base_widget'
import ShabbatContent from './src/ShabbatContent'
import ShabbatOptions from './src/ShabbatOptions'

export default class Shabbat extends BaseWidget {
  constructor() {
    super({
      name: 'זמני שבת',
      version: '0.1',
      icon: 'star-of-david'
    })
  }

  get Widget() {
    return ShabbatContent
  }

  get Options() {
    return ShabbatOptions
  }
}
