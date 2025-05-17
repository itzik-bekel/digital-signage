const express = require('express')
const router = express.Router()
const multer = require('multer')
const CommonHelper = require('../helpers/common_helper')
const Slide = require('../models/Slide')
const SlideHelper = require('../helpers/slide_helper')
const blobStorage = require('../../services/blobStorage')

// Configure multer for memory storage
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Route: /api/v1/slide
router
  .get('/', (req, res, next) => {
    return Slide.find({})
      .then(slides => {
        if (!slides) {
          res.sendStatus(500)
          return res.send('No slides found')
        }
        return res.json(slides)
      })
      .catch(err => next(err))
  })
  .post('/', upload.single('data'), async (req, res, next) => {
    try {
      if (req.body.slideshow == undefined)
        return next(new Error('Missing Slideshow ID, slide not added'))

      let slideData = req.body.data;
      let blobName = null;
      let mimeType = null;

      // Handle file upload to Azure Blob Storage
      if (req.file) {
        const uploadResult = await blobStorage.uploadFile(req.file);
        slideData = uploadResult.url;
        blobName = uploadResult.name;
        mimeType = req.file.mimetype;
      }

      const newSlide = new Slide({
        data: slideData,
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        slideshow: req.body.slideshow,
        blobName: blobName,
        mimeType: mimeType
      })

      return SlideHelper.addSlide(newSlide, res, next)
    } catch (error) {
      return next(error);
    }
  })

// Route: /api/v1/slide/standalone_upload
router.post('/standalone_upload', upload.single('data'), async (req, res, next) => {
  if (!req.file) return next(new Error('Missing file upload'))

  try {
    const uploadResult = await blobStorage.uploadFile(req.file);
    return res.json({ success: true, url: uploadResult.url });
  } catch (error) {
    return next(error);
  }
})

// Route: /api/v1/slide/:id
router
  .get('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findById(id)
      .then(slide => {
        if (!slide) return next(new Error('Slide not found'))
        return res.json(slide)
      })
      .catch(err => next(err))
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params
    return Slide.findByIdAndRemove(id)
      .then(slide => {
        if (!slide) return next(new Error('Slide not found'))
        return SlideHelper.deleteSlide(slide, next, res)
      })
      .catch(err => next(err))
  })
  .patch('/:id', upload.single('data'), async (req, res, next) => {
    try {
      const { id } = req.params
      const slide = await Slide.findById(id)
      
      if (!slide) return next(new Error('Slide not found'))

      // Handle file upload and update data
      if (req.file) {
        // Delete old blob if exists
        if (slide.blobName) {
          try {
            await blobStorage.deleteFile(slide.blobName);
          } catch (error) {
            console.error('Failed to delete old blob:', error);
          }
        }

        // Upload new file
        const uploadResult = await blobStorage.uploadFile(req.file);
        slide.data = uploadResult.url;
        slide.blobName = uploadResult.name;
        slide.mimeType = req.file.mimetype;
      } else if (req.body.data != null && typeof req.body.data !== undefined) {
        slide.data = req.body.data;
      }

      if ('type' in req.body) slide.type = req.body.type
      if ('title' in req.body) slide.title = req.body.title
      if ('description' in req.body) slide.description = req.body.description
      if ('duration' in req.body) slide.duration = req.body.duration

      await slide.save()
      await CommonHelper.broadcastUpdate(res.io)
      return res.json({ success: true })
    } catch (error) {
      return next(error)
    }
  })

module.exports = router
