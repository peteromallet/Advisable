import sortBy from "lodash/sortBy";
import filter from "lodash/filter";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import React, { Fragment, Component } from "react";
import Text from "src/components/Text";
import Back from "src/components/Back";
import Heading from "src/components/Heading";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import { Times, Time } from "./styles";

const ISO_FORMAT = "YYYY-MM-DDTHH:mm:ss[Z]";

class SelectTime extends Component {
  state = {
    timeZone: this.props.timeZone
  };

  render() {
    const {
      availability,
      unavailable,
      timeZone,
      match,
      clientName
    } = this.props;
    const date = moment.tz(match.params.date, timeZone);
    const times = sortBy(
      filter(availability, t => {
        return date.isSame(t, "day") && unavailable.indexOf(t) === -1;
      }),
      time => moment(time).format("HHmm")
    );

    return (
      <Fragment>
        <Back
          marginBottom="l"
          to={`/interview_request/${match.params.interviewID}`}
        >
          Back
        </Back>
        <Heading size="l" marginBottom="xs">
          {date.format("dddd, DD MMMM")}
        </Heading>
        <Text marginBottom="xl">
          Select a time for your call with {clientName}
        </Text>
        <TimeZoneSelect
          value={this.state.timeZone}
          onChange={timeZone => this.setState({ timeZone })}
        />
        <Times>
          {times.map(time => {
            const parsed = moment.tz(time, this.state.timeZone);
            return (
              <Time key={time} to={parsed.toISOString(true)}>
                {parsed.format("hh:mma")}
                {" - "}
                {parsed.add(30, "minutes").format("hh:mma")}
              </Time>
            );
          })}
        </Times>
      </Fragment>
    );
  }
}

export default SelectTime;
