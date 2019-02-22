const Fish = require('./Fish')

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
  // let newFish = await Fish.findOne({id: result.id})
  // console.log(newFish)
  return result
}

module.exports = {
  saveFish,
  getFishesByUserId,
  getAllFishes,
  getFishById,
  updateFishById
}
