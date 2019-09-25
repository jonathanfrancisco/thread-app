const express = require('express')
const isAuthenticated = require('../middlewares/authenticated')
const imageUploader = require('../middlewares/imageUploader')
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
  imageUploader.single('image'),
  threadController.create
)
indexRouter.get('/view/:id', isAuthenticated, threadController.get)
indexRouter.get('/view/:id/delete', isAuthenticated, threadController.delete)
indexRouter.get(
  '/view/:id/edit',
  isAuthenticated,
  threadController.renderEditPage
)
indexRouter.post('/view/:id/edit', isAuthenticated, threadController.edit)
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
module.exports = indexRouter
