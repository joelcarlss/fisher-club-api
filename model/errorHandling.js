const mongoose = {
  validator: 'ValidatorError',
  validation: 'ValidationError',
  cast: 'CastError',
  mongoError: 'MongoError'
}
const jwt = {
  noToken: 'TypeError'
}
let error = {
  code: 500
}
module.exports = {
  mongooseErrorHandling ({message, name}) {
    console.log('Message: ' + message)
    console.log('Name: ' + name)
    error.message = message
    if (name === mongoose.validation || name === mongoose.validator) {
      error.code = 400
    } else if (name === mongoose.cast) {
      error.code = 404
    } else if (name === mongoose.mongoError) {
      error.code = 409
    }
    return error
  },
  jwtErrorHandling ({ message, name }) {
    error.message = message
    if (name === jwt.noToken) {
      error.code = 401
    }
    return error
  }
}
