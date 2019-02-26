module.exports = class Payload {
  constructor (req) {
    this.payload = {
      message: '',
      data: {},
      path: {
        current: {
          url: '',
          methods: []
        },
        next: []
      }
    }
    this.setCurrentUrl(req)
  }
  setCurrentUrl (req) {
    this.payload.path.current.url = 'http://' + req.headers.host + req.url
  }
  setMessage (message) {
    this.payload.message = message
  }
  setData (data) {
    this.payload.data = data
  }
  setToken (token) {
    this.payload.token = token
  }
  setMethods (methods) {
    this.payload.path.current.methods = methods
  }
  setNext (next) {
    this.payload.path.next = next
  }
  setPath (path) {
    this.setMethods(path.methods)
    this.setNextPath(path)
  }
  setNextPath (path) {
    let obj = {}
    for (let key in path) {
      if (key !== 'methods') {
        obj[key] = path[key]
      }
    }
    this.payload.path.next = obj
  }
  getPayload () {
    return this.payload
  }
}
