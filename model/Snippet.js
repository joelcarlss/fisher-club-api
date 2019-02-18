const mongoose = require('mongoose')
let Schema = mongoose.Schema

// Schema for mongoDB connection
let SnippetData = new Schema({
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    required: true
  }
})

let Snippet = mongoose.model('Snippet', SnippetData)

module.exports = Snippet
