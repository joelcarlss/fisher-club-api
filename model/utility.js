function getFish ({longitude, latitude, species, weight, length, image, time, day}) {
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


function hoursToSeconds (hours) {
  return (hours * 60 * 60)
}

  module.exports = {
    getFish,
    hoursToSeconds
  }
  