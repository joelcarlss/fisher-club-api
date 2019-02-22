const {home} = require('../utils/links')
module.exports = (server) => {
  server.get('/hej/:name', function (req, res, next) {
    res.send('hello ' + req.params.name)
    next()
  })

  server.get('/', (req, res, next) => {
    let payload = {
      message: 'Hello',
      links: home
    }
    res.send(payload)
    next()
  })
}
