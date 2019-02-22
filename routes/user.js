let { readToken } = require('../model/authentication')
let { authenticateUser, createUser } = require('../model/authentication')
let { addWebhook, getWebhooksByUserId } = require('../model/database')
let { user } = require('../utils/links')
const Payload = require('../utils/Payload')

module.exports = (server) => {
  server.get('/user', async (req, res, next) => {
    try {
      let payload = new Payload()
      payload.setLinks(user)
      res.send(payload)
    } catch (e) {
      res.send(e.message)
    }
    next()
  })

  server.post('/user/login', async (req, res, next) => {
    let {username, password} = req.body
    try {
      let token = await authenticateUser(username, password)
      let payload = new Payload()
      payload.setToken(token)
      res.send(payload)
    } catch ({message}) {
      console.log(message)
      res.send(400, message)
    }
    next()
  })

  server.post('/user/create', async (req, res, next) => {
    let {username, password} = req.body
    createUser(username, password) // TODO: AWAIT
    .then(res.send('User Created'))
    .catch(console.log)
    next()
  })

  // Webhook

  server.get('/user/webhook', async (req, res, next) => {
    try {
      let data = readToken(req.headers.authorization)
      let hook = await getWebhooksByUserId(data.id)
      res.send(hook)
    } catch (e) {
      // TODO
    }
    next()
  })

  server.post('/user/webhook', async (req, res, next) => {
    try {
      let { url } = req.body
      let data = readToken(req.headers.authorization)
      let hook = await addWebhook(data.id, url)
      res.send(hook)
    } catch (e) {
      // TODO
    }
    next()
  })

  server.put('/user/webhook', async (req, res, next) => {
    try {
      let data = readToken(req.headers.authorization)
      let hook = await
      res.send(hook)
    } catch (e) {
      // TODO
    }
    next()
  })
}
