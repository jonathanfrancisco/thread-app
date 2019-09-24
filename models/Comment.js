const mongoose = require('mongoose')

const { Schema } = mongoose

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    thread: { type: Schema.Types.ObjectId, ref: 'Thread', required: true }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  }
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
