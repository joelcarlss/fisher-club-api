const Fish = require('./Fish')
function saveFish (fish) {
  let { username,
        userId,
        longitude,
        latitude,
        species,
        width,
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
    width,
    length,
    image,
    time,
    day
  }).save() // Returns what??
}

module.exports = {
  saveFish
}
