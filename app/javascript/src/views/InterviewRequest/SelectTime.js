import React from "react";
import { DateTime } from "luxon";
import filter from "lodash/filter";
import sortBy from "lodash/sortBy";
import { Text, Link, Box } from "@advisable/donut";
import { ArrowLeft } from "@styled-icons/feather/ArrowLeft";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import { Times, Time } from "./styles";

export default function SelectTime(props) {
  const localTimezone = DateTime.local().zoneName;
  const { availability, timeZone, match, clientName } = props;
  const [selectedTimeZone, setTimeZone] = React.useState({
    value: localTimezone || timeZone,
    label: localTimezone || timeZone,
  });

  const date = DateTime.fromISO(match.params.date, { zone: timeZone });
  const times = sortBy(
    filter(availability, (t) => {
      const time = DateTime.fromISO(t, { zone: selectedTimeZone.value });
      return date.day === time.day;
    }),
    (time) => DateTime.fromISO(time).toFormat("T"),
  );

  return (
    <>
      <Link mb="xs" to={`/interview_request/${match.params.interviewID}`}>
        <Box display="inline-block" mr="xxs">
          <ArrowLeft size={16} strokeWidth={2} />
        </Box>
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
        {date.toFormat("cccc, dd LLL yyyy")}
      </Text>
      <Text lineHeight="s" color="neutral800" mb="l">
        Select a time for your call with {clientName}
      </Text>
      <TimeZoneSelect
        value={selectedTimeZone}
        label="Your Timezone"
        placeholder="Your Timezone"
        onChange={(timeZone) => setTimeZone(timeZone)}
      />
      <Times>
        {times.map((time) => {
          const parsed = DateTime.fromISO(time, {
            zone: selectedTimeZone.value,
          });
          return (
            <Time
              key={time}
              to={{
                pathname: parsed.toUTC().toISO(),
                state: { zone: selectedTimeZone.value },
              }}
            >
              {`${parsed.toFormat("h:mm a")} - ${parsed
                .plus({ minutes: 30 })
                .toFormat("h:mm a")}`}
            </Time>
          );
        })}
      </Times>
    </>
  );
}
