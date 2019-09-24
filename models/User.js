const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  threads: [{ type: Schema.Types.ObjectId, ref: 'Thread' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})
userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

module.exports = User
