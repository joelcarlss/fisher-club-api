const { authenticateUser } = require('../model/authentication')
const Payload = require('../utils/Payload')
let { links } = require('../utils/links')

module.exports = (server) => {
  server.post('/auth', async (req, res, next) => {
    let payload = new Payload(req)
    payload.setPath(links().auth)
    let {username, password} = req.body
    if (!username || !password) {
      payload.setMessage('Missing Data')
      res.send(400, payload)
    } else {
      try {
        let token = await authenticateUser(username, password)
        payload.setToken(token)
        res.send(payload)
      } catch ({message}) {
        payload.setMessage(message)
        res.send(403, payload)
      }
    }
    next()
  })
}
