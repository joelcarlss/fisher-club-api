module.exports = (server) => {
  server.post('/user/login', (req, res, next) => {
    console.log(req.body.username)
    console.log(req.body.password)
    res.send('hello')
    next()
  })
}
