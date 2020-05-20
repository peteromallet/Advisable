import React from "react";
import { DateTime } from "luxon";
import { sortBy, filter } from "lodash-es";
import { Text, Link, Box } from "@advisable/donut";
import { ArrowLeft } from "@styled-icons/feather";
import TimeZoneSelect from "src/components/TimeZoneSelect";
import { Times, Time } from "./styles";

export default function SelectTime(props) {
  const { availability, timeZone, match, clientName } = props;
  const [selectedTimeZone, setTimeZone] = React.useState(
    DateTime.local().zoneName || timeZone,
  );

  const date = DateTime.fromISO(match.params.date, { zone: timeZone });
  const times = sortBy(
    filter(availability, (t) => {
      const time = DateTime.fromISO(t);
      return time.hasSame(date, "day");
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
          const parsed = DateTime.fromISO(time, { zone: selectedTimeZone });
          return (
            <Time
              key={time}
              to={{
                pathname: parsed.toUTC().toISO(),
                state: { zone: selectedTimeZone },
              }}
            >
              {`${parsed.toFormat("t")} - ${parsed
                .plus({ minutes: 30 })
                .toFormat("t")}`}
            </Time>
          );
        })}
      </Times>
    </>
  );
}
