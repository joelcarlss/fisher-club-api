const restify = require('restify')
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')

function respond (req, res, next) {
  res.send('hello ' + req.params.name)
  next()
}

mongoose()
var server = restify.createServer()
server.use(bodyParser.urlencoded({extended: true}))
// server.use('/', require('./routes/server')(server))
// server.use('/user', require('./routes/auth')(server))
require('./routes/user')(server)
require('./routes/server')(server)
server.get('/hello/:name', respond)
server.head('/hello/:name', respond)

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url)
})
