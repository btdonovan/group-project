import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import moment from 'moment-timezone';

class WeatherBox extends React.PureComponent {
  state = {
    forecast: {}
  }

  async fetchForecast(location_id, date) {
    await fetch(`http://localhost:3001/getForecast/${location_id}/${date}`)
      .then((response) => response.json())
      .then((json) => {this.setState({forecast: json})})
  }

  render() {
    if (!Object.keys(this.state.forecast).length) {
      this.fetchForecast(this.props.location_id, this.props.date)
    }
    if (this.props.date !== this.state.forecast.date) {
      this.fetchForecast(this.props.location_id, this.props.date)
    }

    let high
    let low
    let degrees = "\u2103"
    
    if (this.props.fahrenheit) {
      high = ((Number(this.state.forecast.high_temp) * 1.8) + 32).toFixed(1)
      low = ((Number(this.state.forecast.low_temp) * 1.8) + 32).toFixed(1)
      degrees = "\u2109"
    } else {
      high = Number(this.state.forecast.high_temp)
      low = Number(this.state.forecast.low_temp)
    }
    let altitude
    let units = 'meters'
    if (this.props.feet) {
      altitude = this.state.forecast.altitude * 3.28084
      altitude = altitude.toFixed(1)
      units = 'feet'
    } else {
      altitude = this.state.forecast.altitude
    }
    let moon
    let visibility = this.state.forecast.visibility
    let phase = this.state.forecast.phase
    if (phase === 0) {
      moon = 'new_moon'
    } else if (phase === 1) {
      if (visibility < 15) {
        moon = 'waxing_10'
      } else if (visibility < 25) {
        moon = 'waxing_20'
      } else if (visibility < 35) {
        moon = 'waxing_30'
      } else {
        moon = 'waxing_40'
      }
    } else if (phase === 2) {
      moon = 'first_qtr_moon'
    } else if (phase === 3) {
      if (visibility < 65) {
        moon = 'waxing_60'
      } else if (visibility < 75) {
        moon = 'waxing_70'
      } else if (visibility < 85) {
        moon = 'waxing_80'
      } else {
        moon = 'waxing_90'
      }
    } else if (phase === 4) {
      moon = 'full_moon'
    } else if (phase === 5) {
      if (visibility >= 85) {
        moon = 'waning_90'
      } else if (visibility >= 75) {
        moon = 'waning_80'
      } else if (visibility >= 65) {
        moon = 'waning_70'
      } else {
        moon = 'waning_60'
      }
    } else if (phase === 6) {
      moon = 'third_qtr_moon'
    } else if (phase === 7) {
      if (visibility >= 35) {
        moon = 'waning_40'
      } else if (visibility >= 25) {
        moon = 'waning_30'
      } else if (visibility >= 15) {
        moon = 'waning_20'
      } else {
        moon = 'waning_10'
      }
    }
    let date = this.state.forecast.date
    let sunrise = this.state.forecast.sunrise
    let sunset = this.state.forecast.sunset
    let moonrise = this.state.forecast.moonrise
    let moonset = this.state.forecast.moonset
    let timezone = this.state.forecast.timezone

    if (date) {
      sunrise = moment(new Date(Date.parse(sunrise))).tz(timezone)
      sunrise = sunrise.format('h:mm A z')
      sunset = moment(new Date(Date.parse(sunset))).tz(timezone)
      sunset = sunset.format('h:mm A z')
      moonrise = moment(new Date(Date.parse(moonrise))).tz(timezone)
      moonrise = moonrise.format('h:mm A z')
      moonset = moment(new Date(Date.parse(moonset))).tz(timezone)
      moonset = moonset.format('h:mm A z')
    }

    let graphic
    if (this.state.forecast.precip >= 80) {
      graphic = 'rainy.svg'
    } else if (this.state.forecast.precip >= 50) {
      graphic = 'drizzle.svg'
    } else if (this.state.forecast.cloud_cover >= 80) {
      graphic = 'cloudy.svg'
    } else if (this.state.forecast.cloud_cover >= 60) {
      graphic = 'mostly_cloudy.svg'
    } else if (this.state.forecast.cloud_cover >= 30) {
      graphic = 'partly_cloudy.svg'
    } else {
      graphic = 'sunny.svg'
    }
    
    if (this.props.startDate) {
      return (
        <div className="card mb-4 shadow">
          <div className="card-header text-white bg-dark">{date} - {this.state.forecast.name}</div>
          <div>
            <div className="img-overlay-container">
              <img src={`/images/${graphic}`} alt={graphic} width="100%"/>
              <div className="card-img-overlay card-body text-white bg-dark">
                <div className="card-text">Altitude: {altitude} {units}</div>
                <div className="card-text">Lat: {this.state.forecast.lat} Lon: {this.state.forecast.lon}</div>
                <div className="card-text">{this.state.forecast.description}</div>
                <div className="card-text">Cloud Cover: {this.state.forecast.cloud_cover}%</div>
                <div className="card-text">Chance of Rain: {this.state.forecast.precip}%</div>
                <div className="card-text">Sunrise: {sunrise}</div>
                <div className="card-text">Sunset: {sunset}</div>
                <div className="card-text">Moonrise: {moonrise}</div>
                <div className="card-text">Moonset: {moonset}</div>
              </div>
            </div>
          </div>
          {/* <div>Visibility: {this.state.forecast.visibility}</div> */}
          <div className="card-footer text-white bg-dark">High: {high}{degrees} - Low: {low}{degrees} <img className="float-right" src={'/images/' + moon + '.png'} alt={moon + ' phase'} width="30px" /></div>
          
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default WeatherBox;