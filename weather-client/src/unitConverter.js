import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

function UnitConverter(props) {

  return (
    <form>
      <input type='checkbox' name='temp' onChange={props.handleTempChange} />
      <label htmlFor='temp'>Fahrenheit</label>
      <br />
      <input type='checkbox' name='dist' onChange={props.handleDistChange} />
      <label htmlFor='dist'>Feet</label>
    </form>
  )
}

export default UnitConverter