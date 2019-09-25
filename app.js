const express = require('express')
const createError = require('http-errors')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const connectDatabase = require('./database')
const setupPassport = require('./passport')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const { secretKey } = require('./config')

const app = express()

connectDatabase()
setupPassport()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
// session will be used by connect-flash/flash() only
app.use(cookieParser(secretKey))
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
  })
)
app.use(flash())

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
