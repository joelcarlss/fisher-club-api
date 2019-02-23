let { readToken } = require('../model/authentication')
let { mongooseErrorHandling } = require('../model/errorHandling')
let { authenticateUser, createUser } = require('../model/authentication')
let { addWebhook, getWebhooksByUserId, getWebhookById, updateWebhookById, deleteWebhookById } = require('../model/database')
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
    try {
      let user = await createUser(username, password)
      res.send(user)
    } catch (e) {
      console.log(e) // TODO: Error handling
      let error = mongooseErrorHandling(e)
      res.send(error.code, error.message)
    }
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

  server.get('/user/webhook/:id', async (req, res, next) => {
    try {
      let id = req.params.id
      let data = readToken(req.headers.authorization)
      let hook = await getWebhookById(id)
      if (hook.userId === data.id) {
        res.send(hook)
      } else {
        res.send(403)
      }
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

  server.put('/user/webhook/:id', async (req, res, next) => {
    try {
      let newHook = req.body
      let id = req.params.id
      let token = readToken(req.headers.authorization)
      let oldHook = await getWebhookById(id)
      if (oldHook.userId === token.id) {
        let result = await updateWebhookById(id, newHook)
        res.send(result)
      } else {
        res.send(403)
      }
    } catch (e) {
      res.send(e.message)
    }
    next()
  })

  server.del('/user/webhook/:id', async (req, res, next) => {
    try {
      let id = req.params.id
      let token = readToken(req.headers.authorization)
      let hook = await getWebhookById(id)
      if (hook.userId === token.id) {
        let result = await deleteWebhookById(id)
        res.send(result)
      } else {
        res.send(403)
      }
    } catch (e) {
      res.send(e.message)
    }
    next()
  })
}
