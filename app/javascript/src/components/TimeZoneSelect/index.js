import React, { Component } from "react";
import moment from "moment-timezone";

const ZONES = moment.tz.names().map(zone => ({
  value: zone,
  label: zone
}));

class TimeZoneSelect extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <select style={{fontSize: 16}} value={this.props.value} onChange={this.handleChange}>
        {ZONES.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
}

export default TimeZoneSelect;
