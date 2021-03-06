let { readToken } = require('../model/authentication')
let { addWebhook, getWebhooksByUserId, getWebhookById, updateWebhookById, deleteWebhookById } = require('../model/database')
let { mongooseErrorHandling } = require('../model/errorHandling')
let { links } = require('../utils/links')
const Payload = require('../utils/Payload')

module.exports = (server) => {
  // Posts new webhook
  server.post('/webhook', async (req, res, next) => {
    let payload = new Payload(req)
    try {
      let { url } = req.body
      let data = readToken(req.headers.authorization)
      let hook = await addWebhook(data.id, url)
      payload.setPath(links(hook.id).webhook)
      payload.setData(hook)
      payload.setMessage('Webhook saved')
      res.send(201, payload)
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })

  // Shows webhook by id
  server.get('/webhook/:id', async (req, res, next) => {
    let payload = new Payload(req)
    try {
      let id = req.params.id
      payload.setPath(links(id).webhook.id)
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

  // updates webhook by id
  server.put('/webhook/:id', async (req, res, next) => {
    let payload = new Payload(req)
    try {
      let newHook = req.body
      let id = req.params.id
      payload.setPath(links(id).webhook.id)
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

  // Deletes webhook by id
  server.del('/webhook/:id', async (req, res, next) => {
    let payload = new Payload(req)
    try {
      let id = req.params.id
      let token = readToken(req.headers.authorization)
      let hook = await getWebhookById(id)
      payload.setPath(links().webhook.id)
      if (hook) {
        payload.setPath(links(id).webhook.id)
        if (hook.userId === token.id) {
          let result = await deleteWebhookById(id)
          payload.setData(result)
          payload.setMessage('Webhook is deleted')
          res.send(payload)
        } else {
          payload.setMessage('Wrong User')
          res.send(403, payload)
        }
      } else {
        payload.setMessage('Resource not found')
        res.send(404, payload)
      }
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })

  // Lists users webhooks
  server.get('/webhook/user/:id', async (req, res, next) => {
    let id = req.params.id
    let payload = new Payload(req)
    payload.setPath(links(id).webhook.user.id)
    try {
      let data = readToken(req.headers.authorization)
      if (id === data.id) {
        let hook = await getWebhooksByUserId(id)
        payload.setData(hook)
        payload.setMessage('Webhooks owned by: ' + data.username)
        res.send(payload)
      } else {
        payload.setMessage('Unauthorized')
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
