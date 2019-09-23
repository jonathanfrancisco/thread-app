const express = require('express')
const authenticated = require('../middlewares/authenticated')
const userController = require('../controllers/userController')
const threadController = require('../controllers/threadController')

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

module.exports = indexRouter
