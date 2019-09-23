const moment = require('moment')
const Thread = require('../models/Thread')
const threadController = {}

threadController.renderThreadsPage = async (req, res, next) => {
  try {
    const threads = await Thread.find({}).sort({ createdAt: -1 })
    res.render('threads', { threads, moment })
  } catch (err) {
    next(err)
  }
}

threadController.renderCreatePage = (req, res) => {
  res.render('create')
}

threadController.create = (req, res) => {
  const { title } = req.body
  Thread.create({ title })
  res.redirect('/threadlist')
}

module.exports = threadController
