require('dotenv').config()

const restify = require('restify')
const bodyParser = require('body-parser')
var jwt = require('restify-jwt-community')

const mongoose = require('./config/mongoose')

function respond (req, res, next) {
  res.send('hello ' + req.params.name)
  next()
}

mongoose()
var server = restify.createServer()

server.use(bodyParser.urlencoded({extended: true}))
server.use(jwt({ secret: process.env.SECRET }).unless({path: ['/', '/user/login', '/user/create']}))

require('./routes/user')(server)
require('./routes/server')(server)
require('./routes/fish')(server)

server.get('/hello/:name', respond)
server.head('/hello/:name', respond)

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url)
})
