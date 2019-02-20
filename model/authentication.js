require('dotenv').config()

const jwt = require('jsonwebtoken')
const User = require('./User')

function createUser (username, password) {
  return new User({
    username: username,
    password: password
  }).save() // Returns what??
}

async function authenticateUser (username, password) {
  let user = await User.authenticate(username, password)
  let token = jwt.sign({username: user.username, id: user.id}, process.env.SECRET, {
    expiresIn: 2400
  })
  return token
}

function readToken () {

}

function logoutUser () {
  console.log('Logged out') // TODO: Functionality
}

module.exports = {
  createUser,
  authenticateUser,
  logoutUser
}
