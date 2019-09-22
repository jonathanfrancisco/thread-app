const mongoose = require('mongoose')
const { mongoUrl } = require('./config')

module.exports = () => {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch(err => {
      console.error(err)
    })
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connnection successfully connected to ${mongoUrl}`)
  })
}
