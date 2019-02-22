const mongoose = require('mongoose')
let Schema = mongoose.Schema

// Schema for mongoDB connection
let WebhookSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('fish', WebhookSchema)
