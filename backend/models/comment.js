const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  blogId: {
    type: String,
    required: true
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    // blogId is not needed in frontend
    delete returnedObject.blogId
  }
})

module.exports = mongoose.model('Comment', commentSchema)