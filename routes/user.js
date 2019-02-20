let { authenticateUser, createUser } = require('../model/authentication')

module.exports = (server) => {
  server.post('/user/login', async (req, res, next) => {
    let {username, password} = req.body
    try {
      let token = await authenticateUser(username, password)
      res.send(token)
    } catch ({message}) {
      console.log(message)
      res.send(400, message)
    }
    next()
  })

  server.post('/user/create', (req, res, next) => {
    let {username, password} = req.body

    createUser(username, password)
    .then(res.send('User Created'))
    .catch(console.log)
    next()
  })
}
