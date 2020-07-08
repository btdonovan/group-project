import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import WeatherBox from './weatherbox'
import RouteSelector from './routeSelector'
import DateSelector from './dateSelector'
import UnitConverter from './unitConverter'
import moment from 'moment-timezone';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fahrenheit: false,
      feet: false,
      route: 0,
      routes: [],
      stops: [],
      dates: [],   
    }
    this.fetchRoutes = this.fetchRoutes.bind(this)
    this.handleRouteChange = this.handleRouteChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTempChange = this.handleTempChange.bind(this)
    this.handleDistChange = this.handleDistChange.bind(this)
  }

  async fetchRoutes() {
    await fetch(`http://localhost:3001/routes`)
      .then((response) => response.json())
      .then((json) => {this.setState({routes: json})})
  }

  handleRouteChange(event) {
    if (event.target.value) {
      let index = event.target.value - 1
      let stops = [
        this.state.routes[index].stop1,
        this.state.routes[index].stop2,
        this.state.routes[index].stop3,
        this.state.routes[index].stop4
      ]
      stops = stops.filter(stop => Boolean(stop))
      
      this.setState({
        route: event.target.value,
        stops: stops,
        startDate: undefined,
      })
    }
  }

  handleDateChange(event) {
    
    this.setState({
      startDate: event.target.value,
      dates: this.state.stops.map((_, index) => moment(event.target.value).tz('UTC').add(index, 'days').format('YYYY-MM-DD'))
    })
  }

  handleTempChange() {
    this.setState({fahrenheit: !this.state.fahrenheit})
  }

  handleDistChange() {
    this.setState({feet: !this.state.feet})
  }

  render() {
    if (this.state.routes.length === 0) {
      this.fetchRoutes()
    }
    let stops = 0
    
    if (this.state.stops) {
      stops = this.state.stops.length
    }
    
    return (
      <div className="container">
        <div className="col-md-12">
          <div>
          <RouteSelector handleRouteChange={this.handleRouteChange} routes={this.state.routes}/>
          </div>
          <div>
          <DateSelector handleDateChange={this.handleDateChange} stops={stops} initial={this.state.startDate} />
          </div>
          <div>
          <UnitConverter handleTempChange={this.handleTempChange} handleDistChange={this.handleDistChange} />
          </div>
          {this.state.dates.map((date, index) => <WeatherBox key={index} location_id={this.state.stops[index]} fahrenheit={this.state.fahrenheit} feet={this.state.feet} startDate={this.state.startDate} date={date}/>)}
        </div>
      </div>
    )
  }
}
// {/*  */}
export default App;
