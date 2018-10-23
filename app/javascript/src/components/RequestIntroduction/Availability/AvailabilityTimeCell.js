import { uniqueId } from "lodash";
import React, { Component } from "react";
import { TimeCell } from "./styles";

class AvailabilityTimeCell extends Component {
  componentWillMount() {
    this.id = uniqueId("time");
    this.value = [
      this.props.time.toISOString(),
      this.props.time.add(30, 'minutes').toISOString()
    ];
  }

  handleChange = e => {
    this.props.onSelect(this.value);
  };

  render() {
    const { disabled } = this.props;

    return (
      <TimeCell disabled={disabled}>
        {!disabled && (
          <React.Fragment>
            <input
              type="checkbox"
              id={this.id}
              checked={this.props.checked}
              onChange={this.handleChange}
            />
            <label htmlFor={this.id} />
          </React.Fragment>
        )}
      </TimeCell>
    );
  }
}

export default AvailabilityTimeCell;
