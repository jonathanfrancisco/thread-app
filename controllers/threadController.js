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

threadController.create = (req, res) => {
  const { title } = req.body
  Thread.create({ title })
  return res.redirect('/threadlist')
}

threadController.get = async (req, res, next) => {
  try {
    const { id } = req.params
    const thread = await Thread.findById(id)
    return res.render('viewThread', { thread, moment })
  } catch (err) {
    next(err)
  }
}

module.exports = threadController
