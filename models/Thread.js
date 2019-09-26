const mongoose = require('mongoose')

const { Schema } = mongoose

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  }
)

const threadSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
)

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
