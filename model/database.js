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
  console.log(fish)
  let result = await Fish.findByIdAndUpdate(id, {$set: fish})
  console.log(result)
  return result
}

module.exports = {
  saveFish,
  getFishesByUserId,
  getAllFishes,
  getFishById,
  updateFishById
}
