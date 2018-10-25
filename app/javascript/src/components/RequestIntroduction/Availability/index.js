import { times } from "lodash";
import moment from "moment-timezone";
import reduce from "lodash/reduce";
import React, { Component } from "react";
import { Wrapper, Times, Day } from "./styles";
import AvailabilityHours from "./AvailabilityHours";
import AvailabilityTimeCell from "./AvailabilityTimeCell";
import AvailabilityCalendarHeader from "./AvailabilityCalendarHeader";

const ADD = "ADD";
const REMOVE = "REMOVE";

class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: this.calculateTimes(),
      highlight: null
    };
  }

  componentDidMount() {
    // Auto scroll the view so that the times start at 9am
    this.view.scrollTop = 360;

    document.addEventListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  componentDidUpdate(prevProps) {
    // If the timezone changes then we need to recalculate the times.
    if (prevProps.timeZone !== this.props.timeZone) {
      this.setState({ times: this.calculateTimes() });
    }
  }

  // Returns a matrix of available times over the next 7 days.
  // This will be an array repesenting the next 7 days, with each item being an
  // array of available times. The first item in the array represents tomorrow.
  // e.g [[...], [...], [...], [....], [....], [....], [...]]
  calculateTimes = () => {
    const baseDate = moment.tz(this.props.timeZone).startOf("day");

    return times(7, day => {
      return times(24, hour => {
        return moment(baseDate)
          .add(day + 1, "days")
          .set("hour", hour);
      });
    });
  };

  handleMouseDown = cell => {
    const isSelected = this.isSelected(cell);
    const highlight = {
      from: cell,
      to: cell,
      action: isSelected ? REMOVE : ADD
    };

    this.setState({ highlight });
  };

  handleMouseOver = cell => {
    if (!this.state.highlight) return;
    const highlight = { ...this.state.highlight, to: cell };
    this.setState({ highlight });
  };

  handleMouseUp = () => {
    if (this.state.highlight) {
      this.processHighlight()
    }
  }

  handleTap = cell => {
    const isSelected = this.isSelected(cell);
    const highlight = {
      from: cell,
      to: cell,
      action: isSelected ? REMOVE : ADD
    };

    this.setState({ highlight }, this.processHighlight);
  }

  processHighlight = () => {
    const { highlight, times } = this.state;
    const { from, to } = highlight;
    let lower = from;
    let higher = to;

    if (lower[0] > higher[0] || lower[1] > higher[1]) {
      lower = to
      higher = from
    }

    const selection = [];
    for (var c = lower[0]; c <= higher[0]; c++) {
      for (var r = lower[1]; r <= higher[1]; r++) {
        const time = times[c][r];
        const day = time.day();
        const isWeekend = day === 6 || day === 0; // 6 = Saturday, 0 = Sunday
        if (!isWeekend) {
          selection.push(time.toISOString());
          selection.push(
            moment(time)
              .add(30, "minutes")
              .toISOString()
          );
        }
      }
    }

    const selected = reduce(
      selection,
      (collection, time) => {
        const index = collection.indexOf(time);
        if (highlight.action === REMOVE) {
          if (index > -1) {
            return [
              ...collection.slice(0, index),
              ...collection.slice(index + 1)
            ];
          }
          return collection;
        } else {
          if (index > -1) {
            return collection
          } else {
          return [...collection, time];
          }
        }
      },
      this.props.selected
    );

    this.props.onSelect(selected);
    this.setState({ highlight: null });
  };

  isSelected = cell => {
    const time = this.state.times[cell[0]][cell[1]];
    return this.props.selected.indexOf(time.toISOString()) > -1;
  };

  isHighlighted = cell => {
    const { highlight } = this.state;
    if (!highlight) return false;
    const { from, to } = highlight;

    if (from[0] < to[0] || from[1] < to[1]) {
      return (
        cell[0] >= from[0] &&
        cell[1] >= from[1] &&
        cell[0] <= to[0] &&
        cell[1] <= to[1]
      );
    } else {
      return (
        cell[0] >= to[0] &&
        cell[1] >= to[1] &&
        cell[0] <= from[0] &&
        cell[1] <= from[1]
      );
    }
  };

  render() {
    return (
      <Wrapper>
        <AvailabilityCalendarHeader dates={this.state.times.map(t => t[0])} />
        <Times innerRef={c => (this.view = c)}>
          <AvailabilityHours />
          {this.state.times.map((times, d) => (
            <Day key={d} isSaturday={times[0].day() === 6} isSunday={times[0].day() === 0}>
              {times.map((time, i) => (
                <AvailabilityTimeCell
                  key={i}
                  time={time}
                  cell={[d, i]}
                  isSelected={this.isSelected([d, i])}
                  isHighlighted={this.isHighlighted([d, i])}
                  onTap={this.handleTap}
                  onMouseDown={this.handleMouseDown}
                  onMouseOver={this.handleMouseOver}
                />
              ))}
            </Day>
          ))}
        </Times>
      </Wrapper>
    );
  }
}

export default Availability;
