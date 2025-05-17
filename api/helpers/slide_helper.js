const Slideshow = require('../models/Slideshow')
const CommonHelper = require('./common_helper')
const blobStorage = require('../../services/blobStorage')

async function addSlide(slide, res, next) {
  try {
    const slideshow = await Slideshow.findById(slide.slideshow)
    if (!slideshow) return next(new Error('Slideshow not found'))

    const savedSlide = await slide.save()
    if (!savedSlide) return next(new Error('Slide not saved'))

    slideshow.slides.push(savedSlide._id)
    const savedSlideshow = await slideshow.save()
    if (!savedSlideshow) return next(new Error('Slideshow not saved'))

    await CommonHelper.broadcastUpdate(res.io)
    return res.json({ success: true })
  } catch (error) {
    return next(error)
  }
}

async function deleteSlide(slide, next, res) {
  try {
    const slideshow = await Slideshow.findById(slide.slideshow)
    if (!slideshow) return next(new Error('Slideshow not found'))

    // Delete blob if it exists
    if (slide.type === 'photo' && slide.blobName) {
      try {
        await blobStorage.deleteFile(slide.blobName)
      } catch (error) {
        console.error('Failed to delete blob:', error)
        // Continue with slide deletion even if blob deletion fails
      }
    }

    slideshow.slides = slideshow.slides.filter(value => !slide._id.equals(value))
    await slideshow.save()
    await CommonHelper.broadcastUpdate(res.io)
    return res.json({ success: true })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  deleteSlide,
  addSlide
}
