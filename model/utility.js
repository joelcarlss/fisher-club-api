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
  
  module.exports = {
    getFish
  }
  