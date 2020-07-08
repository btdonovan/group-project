import React from 'react';
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
    
    if (this.props.startDate) {
      return (
        <div>
          <div>{this.state.forecast.name}</div>
          <div>{date}</div>
          <div>{altitude} {units}</div>
          <div>Lat: {this.state.forecast.lat} Lon: {this.state.forecast.lon}</div>
          <div>{this.state.forecast.description}</div>
          <div>High: {high}{degrees}</div>
          <div>Low: {low}{degrees}</div>
          <div>Chance of Rain: {this.state.forecast.precip}%</div>
          <div>Cloud Cover: {this.state.forecast.cloud_cover}%</div>
          <div>Sunrise: {sunrise}</div>
          <div>Sunset: {sunset}</div>
          <div>Moonrise: {moonrise}</div>
          <div>Moonset: {moonset}</div>
          <div>Visibility: {this.state.forecast.visibility}</div>
          <img src={'/images/' + moon + '.png'} alt={moon + ' phase'} width="25px" />
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