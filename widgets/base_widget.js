const EmptyWidget = require('../components/Widgets/EmptyWidget').default
const EmptyWidgetOptions = require('../components/Widgets/EmptyWidgetOptions').default

const REQUIRED_DEF_FIELDS = ['name', 'version', 'icon']

class BaseWidget {
  constructor(definition) {
    for (const reqField of REQUIRED_DEF_FIELDS) {
      if (!(reqField in definition)) {
        throw new Error(`${reqField} is a required property of new widgets.`)
      }
    }
    for (const defField of Object.keys(definition)) {
      this[defField] = definition[defField]
    }
  }

  get Widget() {
    return EmptyWidget
  }

  get Options() {
    return EmptyWidgetOptions
  }
}

module.exports = BaseWidget
