const fs = require('fs')
const moment = require('moment')
const { ObjectId } = require('mongoose').Types
const Thread = require('../models/Thread')

const threadController = {}

threadController.renderThreadsPage = async (req, res, next) => {
  try {
    const threads = await Thread.find({})
      .sort({ createdAt: -1 })
      .populate('user')
    res.render('threads', { threads, user: req.user, moment })
  } catch (err) {
    next(err)
  }
}

threadController.renderCreatePage = (req, res) => {
  res.render('create', { errors: req.flash('errors') })
}

threadController.create = async (req, res, next) => {
  try {
    const thread = await Thread.create({
      title: req.body.title,
      user: req.user._id,
      image: !req.file ? null : `${Date.now()}-${req.file.originalname}`
    })
    if (thread.image)
      fs.writeFileSync(`./public/images/${thread.image}`, req.file.buffer)

    res.redirect('/threadlist')
  } catch (err) {
    next(err)
  }
}

threadController.get = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) return next()
    const thread = await Thread.findById(id)
      .populate('user')
      .populate('comments.user')
    if (!thread) return next()
    res.render('viewThread', { thread, user: req.user, moment })
  } catch (err) {
    next(err)
  }
}

threadController.delete = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) return next()
    const thread = await Thread.findById(id)
    if (!thread) return next()
    if (thread.user.equals(req.user._id)) {
      await Thread.findByIdAndDelete(id)
      if (thread.image) fs.unlinkSync(`./public/images/${thread.image}`)
    }
    res.redirect('/threadlist')
  } catch (err) {
    next(err)
  }
}

threadController.renderEditPage = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) return next()
    const thread = await Thread.findById(id).populate('user')
    if (!thread) return next()
    res.render('editThread', { thread, errors: req.flash('errors') })
  } catch (err) {
    next(err)
  }
}

threadController.edit = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) return next()
    let thread = await Thread.findById(id).populate('user')
    if (!thread) return next()
    if (thread.user.equals(req.user._id)) {
      const { title } = req.body
      if (req.file) {
        if (thread.image) fs.unlinkSync(`./public/images/${thread.image}`) // delete current image
        thread = await Thread.findByIdAndUpdate(
          id,
          {
            title,
            image: `${Date.now()}-${req.file.originalname}`
          },
          { new: true }
        )
        fs.writeFileSync(`./public/images/${thread.image}`, req.file.buffer)
      } else await Thread.findByIdAndUpdate(id, { title })
    }
    res.redirect(`/view/${id}`)
  } catch (err) {
    next(err)
  }
}

module.exports = threadController
