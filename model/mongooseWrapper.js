const User = require('./User')

// returns Promise User or throws an error
function createUser (username, password) {
  return new User({
    username: username,
    password: password
  }).save() // Returns what??
}

function authenticateUser (username, password) {
  if (username && password) {
    User.authenticate(username, password, (error, user) => {
      if (error || !user) {
        throw new Error({
          type: 'ValidationError',
          message: 'Wrong Username or Password'
        })
      } else {
        return {
          id: user._id,
          username: user.username
        }
      }
    })
  } else {
    throw new Error({
      type: 'MissingDataError',
      message: 'All fields required'
    })
  }
}

function logoutUser () {
  console.log('Logged out') // TODO: Functionality
}

module.exports = {
  createUser,
  authenticateUser
}
