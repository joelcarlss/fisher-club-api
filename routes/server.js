const Payload = require('../utils/Payload')
const { links } = require('../utils/links')
module.exports = (server) => {
  server.get('/hej/:name', function (req, res, next) {
    res.send('hello ' + req.params.name)
    next()
  })

  server.get('/', (req, res, next) => {
    let payload = new Payload(req)
    payload.setMessage('Hello')
    payload.setPath(links())
    res.send(payload)
    next()
  })
}
