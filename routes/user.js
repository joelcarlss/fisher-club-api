let { readToken } = require('../model/authentication')
let { mongooseErrorHandling } = require('../model/errorHandling')
let { createUser } = require('../model/authentication')
let { addWebhook, getWebhooksByUserId, getWebhookById, updateWebhookById, deleteWebhookById } = require('../model/database')
// let { mongooseErrorHandling } = require('../model/errorHandling')
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
    let payload = new Payload()
    // TODO: this should return the current user
    res.send(payload)
    next()
  })

  // Webhook

  server.get('/user/:id/webhook/', async (req, res, next) => {
    let payload = new Payload()
    try {
      let data = readToken(req.headers.authorization)
      let hook = await getWebhooksByUserId(data.id)
      payload.setData(hook)
      payload.setMessage('Webhook Saved')
      res.send(payload)
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })

  server.post('/user/:id/webhook', async (req, res, next) => {
    let payload = new Payload()
    try {
      let { url } = req.body
      let data = readToken(req.headers.authorization)
      let hook = await addWebhook(data.id, url)
      payload.setData(hook)
      payload.setMessage('Webhook saved')
      res.send(payload)
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })

  server.get('/user/:id/webhook/:id', async (req, res, next) => {
    let payload = new Payload()
    try {
      let id = req.params.id
      let data = readToken(req.headers.authorization)
      let hook = await getWebhookById(id)
      if (hook.userId === data.id) {
        payload.setData(hook)
        res.send(payload)
      } else {
        payload.setMessage('Wrong User')
        res.send(403, payload)
      }
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })

  server.put('/user/:id/webhook/:id', async (req, res, next) => {
    let payload = new Payload()
    try {
      let newHook = req.body
      let id = req.params.id
      let token = readToken(req.headers.authorization)
      let oldHook = await getWebhookById(id)
      if (oldHook.userId === token.id) {
        let result = await updateWebhookById(id, newHook)
        payload.setData(result)
        res.send(payload)
      } else {
        payload.setMessage('Wrong User')
        res.send(403, payload)
      }
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })

  server.del('/user/:id/webhook/:id', async (req, res, next) => {
    let payload = new Payload()
    try {
      let id = req.params.id
      let token = readToken(req.headers.authorization)
      let hook = await getWebhookById(id)
      if (hook.userId === token.id) {
        let result = await deleteWebhookById(id)
        payload.setData(result)
        res.send(payload)
      } else {
        payload.setMessage('Wrong User')
        res.send(403, payload)
      }
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })
}
