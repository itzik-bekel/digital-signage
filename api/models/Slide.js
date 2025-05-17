const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Slide = new Schema({
  data: { type: String, default: '' },  // URL for web/youtube, blob URL for photo/video
  type: {
    type: String,
    default: 'photo',
    enum: ['photo', 'web', 'youtube', 'video']
  },
  title: { type: String },
  description: { type: String },
  duration: { type: Number, default: 5, min: 1 },
  slideshow: { type: Schema.Types.ObjectId, ref: 'Slideshow' },
  // New fields for blob storage
  blobName: { type: String },  // Original blob name in Azure Storage
  mimeType: { type: String }   // File mime type
})

// Delete blob when slide is deleted
Slide.pre('remove', async function(next) {
  if (this.type === 'photo' && this.blobName) {
    try {
      const blobStorage = require('../../services/blobStorage');
      await blobStorage.deleteFile(this.blobName);
    } catch (error) {
      console.error('Failed to delete blob:', error);
      // Continue with slide deletion even if blob deletion fails
    }
  }
  next();
})

module.exports = mongoose.model('Slide', Slide)
