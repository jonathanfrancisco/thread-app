const express = require('express')
const userController = require('../controllers/userController')

const usersRouter = express.Router()

usersRouter.post('/register', userController.register)
usersRouter.post('/login', userController.login)
usersRouter.get('/logout', userController.logout)

module.exports = usersRouter
