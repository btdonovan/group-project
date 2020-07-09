const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 3001
const db = require('./queries')
// var whitelist = ['http://localhost:3000', 'http://localhost:3001']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(bodyParser.json())
app.use(cors())

app.listen(port, () => {
  console.log(`app running on port ${port}.`)
})

// Root
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API for weather forecasts in Yellowstone National Park' })
})

//// forecasts

  // Create User
app.post('/forecast', (request, response) => {
  let location_id = request.body.location_id
  let date = request.body.date
  let description = request.body.description
  let high_temp = request.body.high_temp
  let low_temp = request.body.low_temp
  let precip = request.body.precip
  let cloud_cover = request.body.cloud_cover
  let sunrise = request.body.sunrise
  let sunset = request.body.sunset
  let moonrise = request.body.moonrise
  let moonset = request.body.moonset
  if (
    location_id && 
    date && 
    description && 
    high_temp && low_temp &&
    precip && precip >= 0 && precip <= 100 &&
    cloud_cover && cloud_cover >= 0 && cloud_covber <= 100 &&
    sunrise && sunset && 
    moonrise && moonset
    ) {
    db.createForecast(request, response)
  } else {
    response.send('Forecast data was incomplete.')
  }
})

  // Read forecast
app.get('/forecast/:id', (request, response) => {
  db.readRow(request, response, 'forecasts')
})

  // Update forecast
app.patch('/user/:id', (request, response) => {
  if (
    (precip && precip >= 0 && precip <= 100 && cloud_cover && cloud_cover >= 0 && cloud_covber <= 100) ||
    (precip && precip >= 0 && precip <= 100 && !cloud_cover) ||
    (cloud_cover && cloud_cover >= 0 && cloud_covber <= 100 && !precip) ||
    (!precip && !cloud_cover)
  ) {
    db.updateForecast(request, response)
  }
})

  // Delete forecast
app.delete('/forecast/:id', (request, response) => {
  db.deleteRow(request, response, 'forecasts')
})

  // List forecasts
app.get('/forecasts', (request, response) => {
  db.listRows(request, response, 'forecasts')
})

//// Locations

  // Create location
app.post('/location', (request, response) => {
  let name = request.body.name
  let altitude = request.body.altitude
  let lat = request.body.lat
  let lon = request.body.lon
  if (name && altitude && lat && lon && -180 <= lat <= 180 && -90 <= lon <= 90) {
    db.createLocation(request, response)
  } else {
    response.send('Location data was incomplete.')
  }
})

  // Read Location
app.get('/location/:id', (request, response) => {
  db.readRow(request, response, 'locations')
})

  // Update Location
app.patch('/location/:id', (request, response) => {
  db.updateLocation(request, response, 'locations')
})

  // Delete Location
app.delete('/location/:id', (request, response) => {
  db.deleteRow(request, response, 'locations')
})

  // List Locations
app.get('/locations', (request, response) => {
  db.listRows(request, response, 'locations')
})

//// moon

  // Create moon phase
app.post('/moon', (request, response) => {
  let date = request.body.date
  let phase = request.body.phase
  let visibility = request.body.visibility
  if (date && phase && visibility) {
    db.createMoon(request, response)
  } else {
    response.send('Moon phase data was incomplete.')
  }
})

  // Read moon phase
app.get('/moon/:id', (request, response) => {
  db.readRow(request, response, 'moon')
})

  // Update moon phase
app.patch('/moon/:id', (request, response) => {
  db.updateMoon(request, response)
})

  // Delete moon phase
app.delete('/moon/:id', (request, response) => {
  db.deleteRow(request, response, 'moon')
})

  // List moon phases
app.get('/moon', (request, response) => {
  db.listRows(request, response, 'moon')
})

//// Routes

  // Create route
app.post('/route', (request, response) => {
  let name = request.body.name
  let stops = request.body.stops
  let stop1 = request.body.stop1
  let stop2 = request.body.stop2
  let stop3 = request.body.stop3
  let stop4 = request.body.stop4
  if ((stops === 3 && !stop3) || stops === 4 && !stop4) {
    response.send('Route data was incomplete.')
  } else if (name && stops && stop1 && stop2) {
    db.createRoute(request, response)
  } else {
    response.send('Route data was incomplete.')
  }
})

  // Read route
app.get('/route/:id', (request, response) => {
  db.readRow(request, response, 'routes')
})

  // Update route
app.patch('/route/:id', (request, response) => {
  db.updateRoute(request, response)
})

  // Delete route
app.delete('/route/:id', (request, response) => {
  db.deleteRow(request, response, 'routes')
})

  // List routes
app.get('/routes', (request, response) => {
  db.listRows(request, response, 'routes')
})

app.get('/getForecast/:location_id/:date', (request, response) => {
  if (request.params.date && request.params.location_id) {
    db.joinLocationDate(request, response)
  } else {
    response.send('Please provide a location_id and a date in your request.')
  }
})