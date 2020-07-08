import React from 'react';
import './App.css';

function RouteSelector(props) {
  if (props.routes.length === 0) {
    return (<div>Waiting...</div>)
  } else {
    return (
      <form>
        <label htmlFor="routes">Choose a route:</label>
        <select name="routes" onChange={props.handleRouteChange}>
          <option></option>
          <option value={1}>{props.routes[0].name}</option>
          <option value={2}>{props.routes[1].name}</option>
          <option value={3}>{props.routes[2].name}</option>
        </select>
      </form>
    )
  }
}

export default RouteSelector