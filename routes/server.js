module.exports = (server) => {
  server.get('/hej/:name', function (req, res, next) {
    res.send('hello ' + req.params.name)
    next()
  })

  server.get('/', (res, next) => {
    res.send('hello')
    next()
  })
}
