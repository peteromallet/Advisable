import React from "react";
import { DateTime } from "luxon";
import filter from "lodash/filter";
import sortBy from "lodash/sortBy";
import { Box, Heading, Text } from "@advisable/donut";
import { Times, Time } from "./styles";
import { useParams, useLocation } from "react-router";
import BackButton from "src/components/BackButton";
import TimezoneSelect from "src/components/AvailabilityForm/TimezoneSelect";

export default function SelectTime(props) {
  const params = useParams();
  const location = useLocation();
  const localTimezone = DateTime.local().zoneName;
  const { availability, timeZone, name } = props;
  const [selectedTimeZone, setTimezone] = React.useState(
    localTimezone || timeZone,
  );

  const date = DateTime.fromISO(params.date, { zone: timeZone });
  const times = sortBy(
    filter(availability, (t) => {
      const time = DateTime.fromISO(t, { zone: selectedTimeZone });
      return date.day === time.day;
    }),
    (time) => DateTime.fromISO(time).toFormat("T"),
  );

  return (
    <>
      <BackButton
        marginBottom={4}
        to={{
          ...location,
          pathname: `/interview_request/${params.interviewID}`,
        }}
      />
      <Heading mb={2}>{date.toFormat("cccc, dd LLL yyyy")}</Heading>
      <Text fontSize="l" lineHeight="24px" color="neutral800">
        Select a time for your call with {name}
      </Text>
      <Times>
        {times.map((time) => {
          const parsed = DateTime.fromISO(time, {
            zone: selectedTimeZone,
          });
          return (
            <Time
              key={time}
              to={{
                pathname: parsed.toUTC().toFormat("HH:mm"),
                state: {
                  ...location.state,
                  zone: selectedTimeZone,
                },
              }}
            >
              {`${parsed.toFormat("h:mm a")} - ${parsed
                .plus({ minutes: 30 })
                .toFormat("h:mm a")}`}
            </Time>
          );
        })}
      </Times>
      <Box paddingTop={4}>
        <TimezoneSelect
          data-testid="timezone"
          value={selectedTimeZone}
          onChange={(e) => setTimezone(e.target.value)}
        />
      </Box>
    </>
  );
}
