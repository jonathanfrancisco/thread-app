const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { secretKey } = require('../config')

const userController = {}

userController.renderLoginPage = (req, res) => {
  res.render('login', { error: req.flash('error') })
}

userController.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const { user, error } = await User.authenticate()(username, password)
    if (user) {
      const token = jwt.sign({ _id: user._id }, secretKey)
      res.cookie('jwt', token, {
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + 43200)
      })
      res.redirect('/threadlist')
    } else if (
      typeof error.IncorrectUsernameError !== 'undefined' ||
      error.IncorrectPasswordError !== 'undefined'
    ) {
      req.flash('error', 'Password or username is incorrect')
      res.redirect('/login')
    } else {
      next(error)
    }
  } catch (err) {
    next(err)
  }
}

userController.renderRegisterPage = (req, res) => {
  res.render('register', {
    success: req.flash('success'),
    errors: req.flash('errors')
  })
}

userController.register = async (req, res, next) => {
  const { username, password, confirmPassword } = req.body
  try {
    if (password !== confirmPassword) {
      req.flash('errors', 'Password and Confirm Password does not match')
      return res.redirect('/register')
    }
    await User.register({ username }, password)
    req.flash('success', 'Registration Successful. You may now login')
    res.redirect('/register')
  } catch (err) {
    if (err.name === 'UserExistsError') {
      req.flash('errors', err.message)
      res.redirect('/register')
    }
    next(err)
  }
}

userController.logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + 43200)
  })
  res.redirect('/login')
}

module.exports = userController
