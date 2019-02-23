let { getFish } = require('../model/utility')
let { getAllWebhooks } = require('../model/database')
var request = require('request')

module.exports = {
  async sendWebhook (data) {
    let fish = getFish(data)
    fish.username = data.username
    sendDataToAllWebhooks(data)
  }
}

async function sendDataToAllWebhooks (data) {
  let hooks = await getAllWebhooks()
  hooks.forEach(element => {
    sendPostRequestToUrl(element.url, data)
  })
}

function sendPostRequestToUrl (url, data) {
  let payload = JSON.stringify(data)
  request.post(url).form(payload)
}
