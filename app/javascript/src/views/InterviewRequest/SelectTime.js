import React from "react";
import sortBy from "lodash/sortBy";
import filter from "lodash/filter";
import moment from "moment-timezone";
import { Text, Link, Icon } from "@advisable/donut";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import { Times, Time } from "./styles";

export default function SelectTime(props) {
  const { availability, timeZone, match, clientName } = props;
  const [selectedTimeZone, setTimeZone] = React.useState(
    timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const date = moment.tz(match.params.date, timeZone);
  const times = sortBy(
    filter(availability, t => {
      return date.isSame(t, "day");
    }),
    time => moment(time).format("HHmm")
  );

  return (
    <>
      <Link mb="xs" to={`/interview_request/${match.params.interviewID}`}>
        <Icon icon="arrow-left" width={16} mr="xxs" />
        Back
      </Link>
      <Text
        as="h1"
        mb="xs"
        fontSize="xxl"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        {date.format("dddd, DD MMMM")}
      </Text>
      <Text lineHeight="s" color="neutral800" mb="l">
        Select a time for your call with {clientName}
      </Text>
      <TimeZoneSelect
        value={selectedTimeZone}
        onChange={timeZone => setTimeZone(timeZone)}
      />
      <Times>
        {times.map(time => {
          const parsed = moment.tz(time, selectedTimeZone);
          return (
            <Time key={time} to={parsed.toISOString(true)}>
              {parsed.format("hh:mma")}
              {" - "}
              {parsed.add(30, "minutes").format("hh:mma")}
            </Time>
          );
        })}
      </Times>
    </>
  );
}
