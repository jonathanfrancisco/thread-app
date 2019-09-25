const express = require('express')
const authenticated = require('../middlewares/authenticated')
const userController = require('../controllers/userController')
const threadController = require('../controllers/threadController')
const commentController = require('../controllers/commentController')

const indexRouter = express.Router()

indexRouter.get('/login', userController.renderLoginPage)
indexRouter.get('/register', userController.renderRegisterPage)
indexRouter.get(
  '/threadlist',
  authenticated,
  threadController.renderThreadsPage
)
indexRouter.get('/create', authenticated, threadController.renderCreatePage)
indexRouter.post('/threadlist', authenticated, threadController.create)
indexRouter.get('/view/:id', authenticated, threadController.get)
indexRouter.get('/view/:id/delete', authenticated, threadController.delete)
indexRouter.get(
  '/view/:id/edit',
  authenticated,
  threadController.renderEditPage
)
indexRouter.post('/view/:id/edit', authenticated, threadController.edit)
indexRouter.post('/view/:id/comments', authenticated, commentController.create)
indexRouter.get(
  '/view/:threadId/comments/:commentId',
  authenticated,
  commentController.delete
)
module.exports = indexRouter
