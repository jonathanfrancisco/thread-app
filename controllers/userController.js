const User = require('../models/User')

const userController = {}

userController.renderLoginPage = (req, res) => {
  res.render('login', { error: req.flash('error') })
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
    return res.redirect('/register')
  } catch (err) {
    if (err.name === 'UserExistsError') {
      req.flash('errors', err.message)
      return res.redirect('/register')
    }
    next(err)
  }
}

userController.logout = (req, res) => {
  req.logout()
  return res.redirect('/login')
}

module.exports = userController
