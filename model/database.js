const Fish = require('./Fish')
const Webhook = require('./Webhook')

// let { getFish } = require('../model/utility')

function saveFish (fish) {
  let { username,
        userId,
        longitude,
        latitude,
        species,
        weight,
        length,
        image,
        time,
        day } = fish
  return new Fish({
    username,
    userId,
    longitude,
    latitude,
    species,
    weight,
    length,
    image,
    time,
    day
  }).save() // Returns what??
}

async function getFishById (id) {
  let fish = await Fish.findOne({ _id: id })
  return fish
}
async function getFishesByUserId (userId) {
  let fishes = await Fish.find({ userId })
  return fishes
}

async function getAllFishes () {
  let fishes = await Fish.find()
  return fishes
}

async function updateFishById (id, fish) {
  let result = await Fish.findOneAndUpdate(id, {$set: fish})
  return result
}

async function deleteFishById (id) {
  let result = await Fish.findOneAndDelete({id})
  return result
}

function addWebhook (userId, url) {
  return new Webhook({
    userId,
    url
  }).save()
}

async function getWebhooksByUserId (userId) {
  let hooks = await Webhook.find({ userId })
  return hooks
}

async function updateWebhookByUserId (id, hook) {
  let result = await Webhook.findByIdAndUpdate(id, {$set: hook})
  return result
}

async function deleteWebhookById (id) {
  let result = await Webhook.findOneAndDelete({id})
  return result
}

module.exports = {
  saveFish,
  getFishesByUserId,
  getAllFishes,
  getFishById,
  updateFishById,
  deleteFishById,
  addWebhook,
  getWebhooksByUserId,
  updateWebhookByUserId,
  deleteWebhookById
}
