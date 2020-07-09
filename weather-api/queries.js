const { Client } = require('pg')
let password
// let user
// if (process.env.DOCKERIZED) {
//   password = process.env.POSTGRES_PASSWORD
//   user = process.env.POSTGRES_USER
// } else {
//   password = 'password'
//   user = 'weather'
// }
// let database = user


const pool = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  // user: user,
  // host: 'database',
  // database: database,
  // password: password,
  // port: 5432,
})

// Generic read, delete, and list functions used for all tables

const readRow = (request, response, tableName) => {
  pool.connect()
  pool.query(
    `SELECT * FROM ${tableName} WHERE id = $1`, 
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      pool.end()
    })
}


const deleteRow = (request, response, tableName) => {
  pool.connect()
  pool.query(
    `DELETE FROM ${tableName} WHERE id = $1`,
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`successfully deleted ${request.params.id}`)
      pool.end()
    }
  )
}

const listRows = (request, response, tableName) => {
  pool.connect()
  pool.query (
    `SELECT * FROM ${tableName} ORDER BY id ASC`,
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      pool.end()
    }
  )
}

// forecasts

const createForecast = (request, response) => {
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
  pool.connect()
  pool.query(
    'INSERT INTO forecasts (location_id, date, description, high_temp, low_temp, precip, cloud_cover, sunrise, sunset, moonrise, moonset) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', 
    [location_id, date, description, high_temp, low_temp, precip, cloud_cover, sunrise, sunset, moonrise, moonset],
    (error, results) => {
      if (error) {
        response.status(500).send('A database error has occurred. Please ensure your request data includes the required fields in the required ranges.')
      } else {
        response.status(201).send(`forecast added for ${date} at location ${location_id}.`)
      }
      pool.end()
    }
  )
}

// readForecast uses readRow

const updateForecast = (request, response) => {
  var forecast
  pool.connect()
  pool.query(
    'SELECT * FROM forecasts WHERE id = $1',
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length === 1) {
        forecast = results.rows[0]
        let newForecast = {...forecast, ...request.body}
        let location_id = newForecast.location_id
        let date = newForecast.date
        let description = newForecast.description
        let high_temp = newForecast.high_temp
        let low_temp = newForecast.low_temp
        let precip = newForecast.precip
        let cloud_cover = newForecast.cloud_cover
        let sunrise = newForecast.sunrise
        let sunset = newForecast.sunset
        let moonrise = newForecast.moonrise
        let moonset = newForecast.moonset
        let id = newForecast.id
        pool.query(
          'UPDATE forecasts SET location_id = $1, date = $2, description = $3, high_temp = $4, low_temp = $5, precip = $6, cloud_cover = $7, sunrise = $8, sunset = $9, moonrise = $10, moonset = $11 WHERE id = $12',
          [location_id, date, description, high_temp, low_temp, precip, cloud_cover, sunrise, sunset, moonrise, moonset],
          (error, results) => {
            if (error) {
              response.status(500).send(`A database error has occurred. Please ensure your changes are within the required ranges for all included values`)
            } else {
              response.send(`updated forecast ${id}`)
            }
            pool.end()
          } 
        )
      }
    }
  )
}
// deleteForecast uses deleteRow
// listForecasts uses listRows

// Locations

const createLocation = (request, response) => {
  let name = request.body.name
  let altitude = request.body.altitude
  let lat = request.body.lat
  let lon = request.body.lon
  pool.connect()
  pool.query(
    `INSERT INTO locations (name, altitude, lat, lon) VALUES ($1, $2, $3, $4)`, 
    [name, altitude, lat, lon],
    (error, results) => {
      if (error) {
        response.status(500).send('A database error has occurred. Please check that you included the required data.')
      } else {
        response.status(201).send(`Location ${name} added.`)
      }
      pool.end()
    }
  )
}

// readLocation uses readRow

const updateLocation = (request, response) => {
  let location
  pool.connect()
  pool.query(
    `SELECT * FROM locations WHERE id = $1`,
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length === 1) {
        location = results.rows[0]
        let newLocation = {...location, ...request.body}
        let name = newLocation.name
        let altitude = newLocation.altitude
        let lat = newLocation.lat
        let lon = newLocation.lon
        let id = newLocation.id
        pool.query(
          `UPDATE ${tableName} SET name = $1, altitude = $2, lat = $3, lon = $4 WHERE id = $5`,
          [name, altitude, lat, lon, id],
          (error, results) => {
            if (error) {
              response.status(500).send('Unable to update using requested data.')
            } else {
              response.send(`updated location ${id}`)
            }
            pool.end()
          }
        )
      }
    }
  )
}

// deleteLocation uses deleteRow
// listLocations uses listRows

// Routes

const createRoute = (request, response) => {
  let name = request.body.name
  let stops = request.body.stops
  let stop1 = request.body.stop1
  let stop2 = request.body.stop2
  let stop3 = request.body.stop3
  let stop4 = request.body.stop4
  pool.connect()
  pool.query(
    'INSERT INTO routes (name, stops, stop1, stop2, stop3, stop4) VALUES ($1, $2, $3, $4, $5, $6)', 
    [name, stops, stop1, stop2, stop3, stop4],
    (error, results) => {
      if (error) {
        response.status(500).send('some required data was missing. Please check your submission and try again.')
      } else {
        response.status(201).send(`${name} with ${stops} stops added.`)
      }
      pool.end()
    }
  )
}

// readRoute uses readRow

const updateRoute = (request, response) => {
  var route
  pool.connect()
  pool.query(
    'SELECT * FROM routes WHERE id = $1',
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length === 1) {
        route = results.rows[0]
        let newRoute = {...route, ...request.body}
        let name = newRoute.name
        let stops = newRoute.stops
        let stop1 = newRoute.stop1
        let stop2 = newRoute.stop2
        let stop3 = newRoute.stop3
        let stop4 = newRoute.stop4
        let id = newRoute.id
        pool.query(
          'UPDATE routes SET name = $1, stops = $2, stop1 = $3, stop2 = $4, stop3 = $5, stop4 = $6 WHERE id = $7',
          [name, stops, stop1, stop2, stop3, stop4, id],
          (error, results) => {
            if (error) {
              response.status(500).send('A database error has occurred. Please check your request and try again.')
            } else {
              response.send(`updated route ${id}`)
            }
            pool.end()
          }
        )
      }
    }
  )
}

// deleteRoute uses deleteRow
// listRoutess uses listRows

// Moon phases

const createMoon = (request, response) => {
  let date = request.body.date
  let phase = request.body.phase
  let visibility = request.body.visibility
  pool.connect()
  pool.query(
    `INSERT INTO moon (date, phase, visibility) VALUES ($1, $2, $3)`, 
    [date, phase, visibility],
    (error, results) => {
      if (error) {
        response.status(500).send("Unable to create moon phase: \n  " + error.detail)
      } else {
        response.status(201).send(`Moon phase added for ${date}.`)
      }
      pool.end()
    }
  )
}

// readMoon uses readRow

const updateMoon = (request, response) => {
  var moon
  pool.connect()
  pool.query(
    'SELECT * FROM moon WHERE id = $1',
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length === 1) {
        moon = results.rows[0]
        let newMoon = {...moon, ...request.body}
        let date = newMoon.date
        let phase = newMoon.phase
        let visibility = newMoon.visibility
        let id = newMoon.id
        pool.query(
          'UPDATE moon SET date = $1, phase = $2, visibility = $3 WHERE id = $4',
          [date, phase, visibility, id],
          (error, results) => {
            if (error) {
              response.status(500).send('Unable to update moon phase data. Please check your request and try again.')
            } else {
              response.send(`updated moon phase for ${date}`)
            }
            pool.end()
          }
        )
      }
    }
  )
}

const joinLocationDate = (request, response) => {
  let date = request.params.date
  let location_id = request.params.location_id
  let query = "\
  SELECT locations.name, locations.altitude, locations.lat, locations.lon, locations.timezone, \
   TO_CHAR(forecasts.date :: DATE, 'yyyy-mm-dd') AS date,\
   forecasts.description, forecasts.high_temp,\
   forecasts.low_temp, forecasts.precip, forecasts.cloud_cover,\
   forecasts.sunrise, forecasts.sunset, forecasts.moonrise, forecasts.moonset,\
   moon.phase, moon.visibility FROM locations INNER JOIN forecasts ON\
   locations.id = forecasts.location_id INNER JOIN moon ON forecasts.date\
   = moon.date WHERE forecasts.date = $1 AND locations.id = $2"
  pool.connect()
  pool.query(
    query,
    [date, location_id],
    (error, results) => {
      if (error) {
        response.status(500).send('Unable to locate requested data.')
      } else {
        response.status(200).json(results.rows[0])
      }
      pool.end()
    }
  )
}

module.exports = {
  readRow,
  deleteRow,
  listRows,
  createForecast,
  updateForecast,
  createLocation,
  updateLocation,
  createRoute,
  updateRoute,
  createMoon,
  updateMoon,
  joinLocationDate
}