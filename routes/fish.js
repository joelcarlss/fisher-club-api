let { readToken } = require('../model/authentication')
let { getFishData, getFishesData } = require('../model/utility')
let { sendWebhook } = require('../model/request')
let { links } = require('../utils/links')
let { saveFish, getFishesByUserId, getAllFishes, updateFishById, getFishById, deleteFishById } = require('../model/database')
let { mongooseErrorHandling } = require('../model/errorHandling')
const Payload = require('../utils/Payload')

module.exports = (server) => {
  server.get('/fish', async (req, res, next) => {
    let payload = new Payload(req)
    payload.setPath(links().fish)
    try {
      let data = await getAllFishes()
      let fishes = getFishesData(data)
      payload.setData(fishes)
      res.send(payload)
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })
  server.post('/fish', async (req, res, next) => {
    let payload = new Payload(req)
    payload.setPath(links().fish)
    let data = readToken(req.headers.authorization)
    let fish = getFishData(req.body)
    fish.username = data.username
    fish.userId = data.id
    try {
      let save = await saveFish(fish)
      sendWebhook(fish)
      payload.setData(save)
      payload.setMessage('Sucessfully saved to database')
      res.send(payload)
    } catch (e) {
      let error = mongooseErrorHandling(e)
      res.send(error.code, error.message)
    }
    next()
  })

  server.get('/fish/:id', async (req, res, next) => {
    let payload = new Payload(req)
    try {
      let id = req.params.id
      payload.setPath(links(id).fish.id)
      let fishFromDb = await getFishById(id)
      let fish = getFishData(fishFromDb)
      fish.username = fishFromDb.username
      payload.setData(fish)
      res.send(payload)
    } catch (e) {
      console.log(e)
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })

  server.put('/fish/:id', async (req, res, next) => {
    let payload = new Payload(req)
    try {
      let newFish = req.body
      let id = req.params.id
      payload.setPath(links(id).fish.id)
      let token = readToken(req.headers.authorization)
      let oldFish = await getFishById(id)
      if (oldFish.userId === token.id) {
        let result = await updateFishById(id, newFish)
        payload.setData(result)
        payload.setMessage('Fish successfully updated')
        res.send(payload)
      } else {
        payload.setMessage('Not the same user')
        res.send(403, payload)
      }
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })

  server.del('/fish/:id', async (req, res, next) => {
    let payload = new Payload(req)
    try {
      let id = req.params.id
      payload.setPath(links(id).fish.id)
      let token = readToken(req.headers.authorization)
      let fish = await getFishById(id)
      if (fish.userId === token.id) {
        let result = await deleteFishById(id)
        payload.setData(result)
        payload.setMessage('Fish deleted')
        res.send(payload)
      } else {
        payload.setMessage('Wrong User')
        res.send(403, payload)
      }
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.message(error.message)
      res.send(error.code, payload)
    }
    next()
  })

  // Fish by user
  server.get('/fish/user/:id', async (req, res, next) => {
    let payload = new Payload(req)
    try {
      let id = req.params.id
      payload.setPath(links(id).fish.user.id)
      let fishes = await getFishesByUserId(id)
      payload.setData(fishes)
      res.send(payload)
    } catch (e) {
      let error = mongooseErrorHandling(e)
      payload.setMessage(error.message)
      res.send(error.code, payload)
    }
    next()
  })
}
