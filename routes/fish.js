let { readToken } = require('../model/authentication')
let { getFish } = require('../model/utility')
let { saveFish } = require('../model/database')

module.exports = (server) => {
  server.get('/fish', (req, res, next) => {
    res.send('hello')
    next()
  })
  server.post('/fish/post', async (req, res, next) => {
    let data = readToken(req.headers.authorization)
    let fish = getFish(req.body)
    fish.username = data.username
    fish.userId = data.id
    try {
      let save = saveFish(fish)
      res.send(save)
    } catch (e) {
      res.send(e.message)
    }
    next()
  })
  server.put('/fish/put', (req, res, next) => {
    res.send('hello')
    next()
  })
//   server.delete('/fish/delete', (req, res, next) => {
//     res.send('hello')
//     next()
//   })
}
