const passport = require('passport')
const { Strategy: JwtStrategy } = require('passport-jwt')
const { secretKey } = require('./config')
const User = require('./models/User')

const jwtStrategyOption = {
  secretOrKey: secretKey,
  jwtFromRequest: req => {
    let token = null
    if (req && req.signedCookies) {
      token = req.signedCookies.jwt
    }
    return token
  }
}

module.exports = () => {
  passport.use(
    new JwtStrategy(jwtStrategyOption, (jwtPayload, done) => {
      User.findById(jwtPayload._id)
        .then(user => {
          done(null, user)
        })
        .catch(err => {
          done(err, false)
        })
    })
  )
}
