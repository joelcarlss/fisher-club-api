require('dotenv').config()

const jwt = require('jsonwebtoken')

const { hoursToSeconds } = require('./utility')
const User = require('./User')

const tokenTtlHours = 3

function createUser (username, password) {
  return new User({
    username: username,
    password: password
  }).save() // Returns what??
}

async function authenticateUser (username, password) {
  try {
    let user = await User.authenticate(username, password)
    let token = jwt.sign({username: user.username, id: user.id}, process.env.SECRET, {
      expiresIn: hoursToSeconds(tokenTtlHours)
    })
    return token
  } catch (error) {
    console.log(error)
    throw new Error('Username or password is incorrect')
  }
}

// Takes JsonWebToken, removes bearer, returns decoded data or error.
function readToken (data) {
  const token = data.split(' ')[1]
  const decoded = jwt.verify(token, process.env.SECRET)
  return decoded
}

function logoutUser () {
  console.log('Logged out') // TODO: Functionality
}

module.exports = {
  createUser,
  authenticateUser,
  readToken,
  logoutUser
}
