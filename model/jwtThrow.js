var jwt = require('jwt')

var token = jwt.sign({ foo: 'bar' }, 'shhhhh')
