const Widget = require('../models/Widget')
const Display = require('../models/Display')
const CommonHelper = require('./common_helper')

function deleteWidgets(widgets, res) {
  return Promise.all(
    widgets.map(widget => {
      return Widget.findByIdAndRemove(widget)
    })
  ).then(() => CommonHelper.broadcastUpdate(res.io))
}

async function newDisplay(req) {
  try {
    const count = await Display.estimatedDocumentCount()
    const newDisplay = new Display({
      name: (req && req.body && req.body.name) || 'Display #' + (count + 1)
    })
    return newDisplay.save()
  } catch (error) {
    console.error('Error creating display:', error)
    return null
  }
}

async function ensureDefaultDisplay() {
  try {
    const count = await Display.countDocuments()
    if (count === 0) {
      console.log('Creating default display...')
      return newDisplay()
    }
    return null
  } catch (error) {
    console.error('Error ensuring default display:', error)
    return null
  }
}

module.exports = {
  deleteWidgets,
  newDisplay,
  ensureDefaultDisplay
}
