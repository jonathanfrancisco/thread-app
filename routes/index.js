const express = require('express')
const isAuthenticated = require('../middlewares/authenticated')
const singleImageParser = require('../middlewares/singleImageParser')
const userController = require('../controllers/userController')
const threadController = require('../controllers/threadController')
const commentController = require('../controllers/commentController')

const indexRouter = express.Router()

indexRouter.get('/login', userController.renderLoginPage)
indexRouter.get('/register', userController.renderRegisterPage)
indexRouter.get(
  '/threadlist',
  isAuthenticated,
  threadController.renderThreadsPage
)
indexRouter.get('/create', isAuthenticated, threadController.renderCreatePage)
indexRouter.post(
  '/threadlist',
  isAuthenticated,
  singleImageParser,
  threadController.create
)
indexRouter.get('/view/:id', isAuthenticated, threadController.get)
indexRouter.get('/view/:id/delete', isAuthenticated, threadController.delete)
indexRouter.get(
  '/view/:id/edit',
  isAuthenticated,
  threadController.renderEditPage
)
indexRouter.post(
  '/view/:id/edit',
  isAuthenticated,
  singleImageParser,
  threadController.edit
)
indexRouter.post(
  '/view/:id/comments',
  isAuthenticated,
  commentController.create
)
indexRouter.get(
  '/view/:threadId/comments/:commentId',
  isAuthenticated,
  commentController.delete
)
indexRouter.get(
  '/view/:threadId/comments/:commentId/view',
  isAuthenticated,
  commentController.get
)
indexRouter.post(
  '/view/:threadId/comments/:commentId/edit',
  isAuthenticated,
  commentController.edit
)

module.exports = indexRouter
