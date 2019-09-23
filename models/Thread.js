const mongoose = require('mongoose')

const { Schema } = mongoose

const threadSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
