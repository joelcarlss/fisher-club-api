let { readToken } = require('../model/authentication')

module.exports = (server) => {
  server.get('/fish', (req, res, next) => {
    res.send('hello')
    next()
  })
  server.post('/fish/post', (req, res, next) => {
    let data = readToken(req.headers.authorization)
    let fish = {}
    fish.username = data.username
    fish.id = data.id
    console.log(fish)
    res.send('hello')
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
