const moment = require('moment')
const { ObjectId } = require('mongoose').Types
const Thread = require('../models/Thread')

const threadController = {}

threadController.renderThreadsPage = async (req, res, next) => {
  try {
    const threads = await Thread.find({}).sort({ createdAt: -1 })
    return res.render('threads', { threads, moment })
  } catch (err) {
    next(err)
  }
}

threadController.renderCreatePage = (req, res) => {
  return res.render('create')
}

threadController.create = async (req, res, next) => {
  try {
    const { title } = req.body
    await Thread.create({ title, user: req.user._id })
    return res.redirect('/threadlist')
  } catch (err) {
    next(err)
  }
}

threadController.get = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return next()
    }

    const thread = await Thread.findById(id)
      .populate('user')
      .populate('comments')
    if (!thread) {
      return next()
    }

    const isByUser = thread.user.equals(req.user._id)
    return res.render('viewThread', { thread, isByUser, moment })
  } catch (err) {
    next(err)
  }
}

threadController.delete = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return next()
    }

    const thread = await Thread.findById(id)
    if (!thread) {
      return next()
    }
    if (thread.user.equals(req.user._id)) {
      await Thread.findByIdAndDelete(id)
    }
    return res.redirect('/threadlist')
  } catch (err) {
    next(err)
  }
}

threadController.renderEditPage = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return next()
    }
    const thread = await Thread.findById(id).populate('user')
    if (!thread) {
      return next()
    }
    return res.render('editThread', { thread })
  } catch (err) {
    next(err)
  }
  res.render('editThread')
}

threadController.edit = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return next()
    }
    const thread = await Thread.findById(id).populate('user')
    if (!thread) {
      return next()
    }
    if (thread.user.equals(req.user._id)) {
      const { title } = req.body
      await Thread.findByIdAndUpdate(id, { title })
    }
    return res.redirect(`/view/${id}`)
  } catch (err) {
    next(err)
  }
}

module.exports = threadController
