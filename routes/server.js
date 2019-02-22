const Payload = require('../utils/Payload')
const {home} = require('../utils/links')
module.exports = (server) => {
  server.get('/hej/:name', function (req, res, next) {
    res.send('hello ' + req.params.name)
    next()
  })

  server.get('/', (req, res, next) => {
    let payload = new Payload()
    payload.setMessage('Hello')
    payload.setLinks(home)
    res.send(payload)
    next()
  })
}
