
let { mongooseErrorHandling } = require('../model/errorHandling')
let { createUser } = require('../model/authentication')
let { user } = require('../utils/links')
const Payload = require('../utils/Payload')

module.exports = (server) => {
  server.get('/user', async (req, res, next) => {
    try {
      let payload = new Payload()
      payload.setLinks(user)
      // TODO: LIST ALL USERS
      res.send(payload)
    } catch (e) {
      res.send(e.message)
    }
    next()
  })

  server.post('/user', async (req, res, next) => {
    let payload = new Payload()
    let {username, password} = req.body
    try {
      let user = await createUser(username, password)
      payload.setData(user)
      payload.setMessage('User created')
      res.send(payload)
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })
  server.get('/user/:id', async (req, res, next) => {
    let id = req.params.id
    let payload = new Payload()
    // TODO: this should return the current user
    res.send(payload)
    next()
  })
}
