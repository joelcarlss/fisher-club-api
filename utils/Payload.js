module.exports = class Payload {
  constructor () {
    this.payload = {
      message: '',
      links: []
    }
  }
  setMessage (message) {
    this.payload.message = message
  }
  setToken (token) {
    this.payload.token = token
  }
  setLinks (links) {
    this.payload.links = links
  }
  getPayload () {
    return this.payload
  }
}
