import React, { Component } from "react";
import Select from "react-select";
import moment from "moment-timezone";
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import ZONES from './zones';

const OPTIONS = ZONES.map(z => ({ label: z, value: z }))

class TimeZoneSelect extends Component {
  handleChange = option => {
    this.props.onChange(option.value);
  };

  get selected() {

  }

  render() {
    return (
      <Select
        options={OPTIONS}
        value={{ value: this.props.value, label: `Timezone: ${this.props.value}` }}
        onChange={this.handleChange}
      />
    );
  }
}

export default TimeZoneSelect;
