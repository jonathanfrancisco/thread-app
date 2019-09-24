const mongoose = require('mongoose')

const { Schema } = mongoose

const threadSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  {
    timestamps: true
  }
)

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
