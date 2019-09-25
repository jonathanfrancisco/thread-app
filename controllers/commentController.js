const { ObjectId } = require('mongoose').Types
const Thread = require('../models/Thread')
const Comment = require('../models/Comment')

const commentController = {}

commentController.create = async (req, res, next) => {
  try {
    const { id } = req.params // id of thread to comment on
    if (!ObjectId.isValid(id)) {
      return next()
    }
    const thread = await Thread.findById(id)
    if (!thread) {
      return next()
    }
    const { body } = req.body
    const { _id: user } = req.user
    const comment = new Comment({ body, user })
    await comment.save()
    thread.comments.push(comment._id)
    await thread.save()
    return res.redirect(`/view/${id}`)
  } catch (err) {
    next(err)
  }
}

commentController.delete = async (req, res, next) => {
  try {
    const { threadId, commentId } = req.body
    if (!Object.isValid(threadId) && !Object.isValid(commentId)) {
      return next()
    }
    const thread = await Thread.findById(threadId)
    const comment = await Comment.findById(commentId)
    if (!thread && !comment) {
      return next()
    }
    // if (comment.user.equals(req.user._id)) {
    // }
  } catch (err) {
    next(err)
  }
}

module.exports = commentController
