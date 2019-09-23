const moment = require('moment')
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
    const { _id: userId } = req.user
    const { title } = req.body
    await Thread.create({ title, user: userId })
    return res.redirect('/threadlist')
  } catch (err) {
    next(err)
  }
}

threadController.get = async (req, res, next) => {
  try {
    const { id } = req.params
    const thread = await Thread.findById(id).populate('user')
    const isByUser = thread.user.equals(req.user._id)
    return res.render('viewThread', { thread, isByUser, moment })
  } catch (err) {
    next(err)
  }
}

module.exports = threadController
