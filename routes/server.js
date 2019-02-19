module.exports = (server) => {
  function response (req, res, next) {
    res.send('hello ' + req.params.name)
    next()
  }
  server.get('/hej/:name', response)
}
