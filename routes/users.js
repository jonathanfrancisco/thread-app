const express = require('express')
const passport = require('passport')
const userController = require('../controllers/userController')

const usersRouter = express.Router()

usersRouter.post('/register', userController.register)
usersRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/threadlist',
    failureFlash: true,
    failureRedirect: '/login'
  })
)
usersRouter.post('/logout', userController.logout)

module.exports = usersRouter
