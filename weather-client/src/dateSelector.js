import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

function DateSelector(props) {
  if (props.stops === 0) {
    return (<div>Waiting...</div>)
  } else {
    let possibleDates = 6
    possibleDates = 6 - props.stops
    let dates = []
    for (var i = 0; i <= possibleDates; i++) {
      dates.push(`2020-07-${11 + i}`)
    }
    return (
      <form>
        <label htmlFor="dates">Choose a start date:</label>
        <select name="dates" onChange={props.handleDateChange} value=''>
          <option>{props.initial || ''}</option>
          {dates.map((date, index) => <option key={index} value={date}>{date}</option>)}
        </select>
      </form>
    )
  }
}

export default DateSelector