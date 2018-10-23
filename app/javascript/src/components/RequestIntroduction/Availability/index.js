import { times } from "lodash";
import moment from "moment-timezone";
import React, { Component } from "react";
import { Wrapper, Times } from "./styles";
import AvailabilityDate from "./AvailabilityDate";
import AvailabilityHours from "./AvailabilityHours";
import AvailabilityCalendarHeader from "./AvailabilityCalendarHeader";

class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: this.calculateDays()
    }
  }

  static defaultProps = {
    selected: []
  };

  componentDidUpdate(prevProps) {
    if (prevProps.timeZone !== this.props.timeZone) {
      this.setState({ dates: this.calculateDays() })
    }
  }

  calculateDays = () => {
    return times(7, d => {
      return moment
        .tz(this.props.timeZone)
        .add(d + 1, "days")
        .startOf("day");
    })
  };

  handleSelect = values => {
    let { selected } = this.props;

    for (var i = 0; i < values.length; i++) {
      const time = values[i];
      const index = selected.indexOf(time);

      if (index > -1) {
        selected = [...selected.slice(0, index), ...selected.slice(index + 1)];
      } else {
        selected = [...selected, time];
      }
    }

    this.props.onSelect(selected);
  };

  render() {
    return (
      <Wrapper>
        <AvailabilityCalendarHeader dates={this.state.dates} />
        <Times>
          <AvailabilityHours />
          {this.state.dates.map((date, i) => (
            <AvailabilityDate
              key={i}
              date={date}
              selected={this.props.selected}
              onSelect={this.handleSelect}
            />
          ))}
        </Times>
      </Wrapper>
    );
  }
}

export default Availability;
