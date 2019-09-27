const { ObjectId } = require('mongoose').Types
const Thread = require('../models/Thread')

const commentController = {}

commentController.create = async (req, res, next) => {
  try {
    const { id: threadId } = req.params
    if (!ObjectId.isValid(threadId)) return next()

    const thread = await Thread.findById(threadId)
    if (!thread) return next()

    const { body } = req.body // comment body
    const { _id: user } = req.user
    thread.comments.push({ body, user })
    await thread.save()
    res.redirect(`/view/${threadId}`)
  } catch (err) {
    next(err)
  }
}

commentController.delete = async (req, res, next) => {
  try {
    const { threadId, commentId } = req.params
    if (!ObjectId.isValid(threadId) && !ObjectId.isValid(commentId))
      return next()

    const thread = await Thread.findById(threadId)
    const comment = thread.comments.id(commentId)
    if (!thread && !comment) return next()

    if (comment.user.equals(req.user._id)) {
      thread.comments.id(commentId).remove()
      await thread.save()
    }
    res.redirect(`/view/${threadId}`)
  } catch (err) {
    next(err)
  }
}

commentController.get = async (req, res, next) => {
  try {
    const { threadId, commentId } = req.params
    if (!ObjectId.isValid(threadId) && !ObjectId.isValid(commentId))
      return next()
    const thread = await Thread.findById(threadId)
    const comment = thread.comments.id(commentId)
    if (!thread && !comment) return next()
    res.render('editComment', { thread, comment })
  } catch (err) {
    next(err)
  }
}

commentController.edit = async (req, res, next) => {
  try {
    const { threadId, commentId } = req.params
    if (!ObjectId.isValid(threadId) && !ObjectId.isValid(commentId))
      return next()
    const thread = await Thread.findById(threadId)
    const comment = thread.comments.id(commentId)
    if (!thread && !comment) return next()
    if (comment.user.equals(req.user._id)) {
      const { body } = req.body
      thread.comments.id(commentId).body = body
      await thread.save()
    }
    res.redirect(`/view/${threadId}`)
  } catch (err) {
    next(err)
  }
}

module.exports = commentController
