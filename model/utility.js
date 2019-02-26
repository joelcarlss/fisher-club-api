function getFishData ({longitude, latitude, species, weight, length, image, time, day}) {
  return {
    longitude,
    latitude,
    species,
    weight,
    length,
    image,
    time,
    day
  }
}

function getFishesData (data) {
  let arr = []
  data.forEach(element => {
    let fish = getFishData(element)
    fish.username = element.username
    fish.id = element.id
    arr.push(fish)
  })
  return arr
}



function hoursToSeconds (hours) {
  return (hours * 60 * 60)
}

  module.exports = {
    getFishData,
    getFishesData,
    hoursToSeconds
  }
  