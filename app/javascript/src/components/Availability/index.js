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
const ISO_FORMAT = "YYYY-MM-DDTHH:mm:ss[Z]";

class Availability extends Component {
  static defaultProps = {
    selected: []
  };

  constructor(props) {
    super(props);

    this.state = {
      weekOffset: 0,
      times: this.calculateTimes(0),
      highlight: null
    };
  }

  componentDidMount() {
    // Auto scroll the view so that the times start at 9am
    this.view.scrollTop = 360;

    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  componentDidUpdate(prevProps) {
    // If the timezone changes then we need to recalculate the times.
    if (prevProps.timeZone !== this.props.timeZone) {
      this.setState({
        times: this.calculateTimes(this.state.weekOffset)
      });
    }
  }

  get previousDisabled() {
    const baseDate = moment
      .tz(this.props.timeZone)
      .add(this.state.weekOffset, "weeks")
      .startOf("day");

    return baseDate.isSameOrBefore(moment());
  }

  // Returns a matrix of available times over the next 7 days.
  // This will be an array repesenting the next 7 days, with each item being an
  // array of available times. The first item in the array represents tomorrow.
  // e.g [[...], [...], [...], [....], [....], [....], [...]]
  calculateTimes = weekOffset => {
    const baseDate = moment
      .tz(this.props.timeZone)
      .add(1, "day")
      .add(weekOffset, "weeks")
      .startOf("day");

    return times(7, day => {
      return times(24, hour => {
        return moment(baseDate)
          .add(day, "days")
          .set("hour", hour);
      });
    });
  };

  nextWeek = () => {
    this.setState({
      weekOffset: this.state.weekOffset + 1,
      times: this.calculateTimes(this.state.weekOffset + 1)
    });
  };

  previousWeek = () => {
    this.setState({
      weekOffset: this.state.weekOffset - 1,
      times: this.calculateTimes(this.state.weekOffset - 1)
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
      this.processHighlight();
    }
  };

  handleTap = cell => {
    const isSelected = this.isSelected(cell);
    const highlight = {
      from: cell,
      to: cell,
      action: isSelected ? REMOVE : ADD
    };

    this.setState({ highlight }, this.processHighlight);
  };

  processHighlight = () => {
    const { highlight, times } = this.state;
    const { from, to } = highlight;
    let lower = from;
    let higher = to;

    if (lower[0] > higher[0] || lower[1] > higher[1]) {
      lower = to;
      higher = from;
    }

    const selection = [];
    for (var c = lower[0]; c <= higher[0]; c++) {
      for (var r = lower[1]; r <= higher[1]; r++) {
        const time = times[c][r];
        const day = time.day();
        const isWeekend = day === 6 || day === 0; // 6 = Saturday, 0 = Sunday
        if (!isWeekend) {
          selection.push(time.utc().format(ISO_FORMAT));
          selection.push(
            moment(time)
              .add(30, "minutes")
              .utc()
              .format(ISO_FORMAT)
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
            return collection;
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
    return this.props.selected.indexOf(time.utc().format(ISO_FORMAT)) > -1;
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
        <AvailabilityCalendarHeader
          onPrevious={this.previousWeek}
          onNext={this.nextWeek}
          previousDisabled={this.previousDisabled}
          dates={this.state.times.map(t =>
            moment.tz(t[0], this.props.timeZone)
          )}
        />
        <Times innerRef={c => (this.view = c)}>
          <AvailabilityHours />
          {this.state.times.map((times, d) => (
            <Day
              key={d}
              isSaturday={moment.tz(times[0], this.props.timeZone).day() === 6}
              isSunday={moment.tz(times[0], this.props.timeZone).day() === 0}
            >
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
