import { times } from "lodash";
import moment from 'moment-timezone';
import React, { Component } from "react";
import { Day } from "./styles";
import AvailabilityTimeCell from "./AvailabilityTimeCell";

class AvailabilityDate extends Component {
  render() {
    const { selected } = this.props;

    return (
      <Day>
        {times(24, h => {;
          const time = moment(this.props.date.set('hour', h));

          return (
            <AvailabilityTimeCell
              time={time}
              checked={selected.indexOf(time.toISOString()) > -1}
              onSelect={this.props.onSelect}
              key={h}
            />
          );
        })}
      </Day>
    );
  }
}

export default AvailabilityDate;
