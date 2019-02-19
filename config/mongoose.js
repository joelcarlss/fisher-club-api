'use strict'

const mongoose = require('mongoose')

const username = 'root'
const password = 'herrgris5'
const CONNECTION_STRING = `mongodb://${username}:${password}@ds139435.mlab.com:39435/smarthome`

module.exports = function () {
  mongoose.connect(CONNECTION_STRING)

  let db = mongoose.connection

  db.on('connected', function () {
    console.log('Mongoose connection open.')
  })

  db.on('error', function (err) {
    console.error('Mongoose connection error: ', err)
  })

  db.on('disconnected', function () {
    console.log('Mongoose connection disconnected.')
  })

    // If the Node process ends, close the Mongoose connection.
  process.on('SIGINT', function () {
    db.close(function () {
      console.log('Mongoose connection disconnected through app termination.')
      process.exit(0)
    })
  })

  return db
}
