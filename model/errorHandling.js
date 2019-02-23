const mongoose = {
  validation: 'ValidatorError',
  cast: 'CastError'
}

module.exports = {
  mongooseErrorHandling ({message, name}) {
    let error = {
      message,
      code: 500
    }
    if (name === mongoose.validation) {
      error.code = 400
    } else if (name === mongoose.cast) {
      error.code = 404
    }
    return error
  }
}
