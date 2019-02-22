let { readToken } = require('../model/authentication')
let { getFish } = require('../model/utility')
let { fish } = require('../utils/links')
const Payload = require('../utils/Payload')

let { saveFish, getFishesByUserId, getAllFishes, updateFishById, getFishById } = require('../model/database')

module.exports = (server) => {
  server.get('/fish', async (req, res, next) => {
    try {
      res.send(fish)
    } catch (e) {
      res.send(e.message)
    }
    next()
  })
  server.get('/fish/all', async (req, res, next) => {
    try {
      let fishes = await getAllFishes()
      res.send(fishes)
    } catch (e) {
      res.send(e.message)
    }
    next()
  })
  server.post('/fish', async (req, res, next) => {
    let data = readToken(req.headers.authorization)
    let fish = getFish(req.body)
    fish.username = data.username
    fish.userId = data.id
    try {
      let save = await saveFish(fish)
      res.send(save)
    } catch (e) {
      res.send(e.message)
    }
    next()
  })
  server.get('/fish/user', async (req, res, next) => {
    try {
      let data = readToken(req.headers.authorization)
      let fishes = await getFishesByUserId(data.id)
      res.send(fishes)
    } catch (e) {
      res.send(e.message)
    }
    next()
  })
  server.get('/fish/:id', async (req, res, next) => {
    try {
      let id = req.params.id
      let fishFromDb = await getFishById(id)
      let fish = getFish(fishFromDb)
      fish.username = fishFromDb.username
      res.send(fish)
    } catch (e) {
      res.send(e.message)
    }
    next()
  })
  server.put('/fish/:id', async (req, res, next) => {
    try {
      let newFish = req.body
      let id = req.params.id
      let token = readToken(req.headers.authorization)
      let oldFish = await getFishById(id)
      if (oldFish.userId === token.id) {
        let result = await updateFishById(id, newFish)
        res.send(result)
      } else {
        res.send(403)
      }
    } catch (e) {
      res.send(e.message)
    }
    next()
  })
  server.del('/fish/:id', (req, res, next) => {
    res.send('hello')
    next()
  })
}
