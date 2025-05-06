const express = require('express')
const router = express.Router()

const Widget = require('../models/Widget')
const CommonHelper = require('../helpers/common_helper')
const WidgetHelper = require('../helpers/widget_helper')

// List all widgets
router.get('/', async (req, res) => {
  try {
    const widgets = await Widget.find({})
    res.json(widgets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single widget
router.get('/:id', async (req, res) => {
  try {
    const widget = await Widget.findById(req.params.id)
    if (!widget) return res.status(404).json({ error: 'Widget not found' })
    res.json(widget)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create widget
router.post('/', async (req, res) => {
  try {
    const widget = await Widget.create(req.body)
    if (!widget) {
      return res.status(500).json({ error: 'Widget creation failed' })
    }
    req.widget = widget
    return WidgetHelper.addWidget(req, res)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update widget
router.put('/:id', async (req, res) => {
  try {
    const widget = await Widget.findByIdAndUpdate(req.params.id, req.body, { new: true })
    req.widget = widget
    if (!widget) return res.status(404).json({ error: 'Widget not found' })
    await CommonHelper.broadcastUpdateMiddleware(req, res, () => {})
    res.json(widget)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete widget
router.delete('/:id', async (req, res) => {
  try {
    const widget = await Widget.findByIdAndDelete(req.params.id)
    req.widget = widget
    if (!widget) return res.status(404).json({ error: 'Widget not found' })
    await WidgetHelper.deleteWidget(req, res, () => {})
    await CommonHelper.broadcastUpdateMiddleware(req, res, () => {})
    res.json({ message: 'Widget deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
