'use stict'

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
let Schema = mongoose.Schema

// User schema for mongoDB connection
let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now }
})

// For saving Schema. Hashes and salts password.
userSchema.pre('save', function (next) {
  var user = this

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

// // Authentication. Controlls user credentials. Throws error if wrong
// userData.statics.authenticate = (username, password, callback) => {
//   User.findOne({ username: username })
//     .exec((err, user) => {
//       if (err) {
//         return callback(err)
//       } else if (!user) {
//         let err = new Error('User not found.')
//         err.status = 401
//         return callback(err)
//       }
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (result) {
//           return callback(null, user)
//         } else {
//           return callback(err)
//         }
//       })
//     })
// }

// Authentication. Controlls user credentials. Throws error if wrong
userSchema.statics.authenticate = async (username, password) => {
  let user = await User.findOne({ username: username })
  let isCorrectPassword = await bcrypt.compare(password, user.password)
  console.log(user)
  if (!isCorrectPassword) {
    throw new Error('Username or password is incorrect')
  } else {
    return user
  }
}

// Validates length of password. Minimum 8 characters
userSchema.path('password').validate(function (password) {
  return password.length >= 8
})

let User = mongoose.model('user', userSchema)

module.exports = User
