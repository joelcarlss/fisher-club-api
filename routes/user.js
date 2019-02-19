require('dotenv').config()
require('../model/mongooseWrapper')
const jwt = require('jsonwebtoken')

module.exports = (server) => {
  server.post('/user/login', (req, res, next) => {
    let {username, password} = req.body
    let token = jwt.sign({username}, process.env.SECRET, {
      expiresIn: 2400
    })

    res.send({token})
    next()
  })
}
