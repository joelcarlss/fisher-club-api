let { readToken } = require('../model/authentication')
let { authenticateUser, createUser } = require('../model/authentication')
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
  server.post('/user/webhook', async (req, res, next) => {
    let { url } = req.body
    let data = readToken(req.headers.authorization)
    addWebhook(data.indexOf, url)
    res.send('Hook Created')
    next()
  })
}
