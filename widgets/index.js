import widgetList from './widget_list'

const widgets = {}
for (const widget of widgetList) {
  const WidgetClass = require('./' + widget).default
  widgets[widget] = new WidgetClass()
}

export default widgets
