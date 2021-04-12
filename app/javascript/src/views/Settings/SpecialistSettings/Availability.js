import React, { useCallback, useMemo } from "react";
import { DateTime } from "luxon";
import { useQuery, gql } from "@apollo/client";
import { Box, Card, Text, Button, Link } from "@advisable/donut";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import Loading from "src/components/Loading";
import DatePicker from "src/components/DatePicker";
import { useSetUnavailableUntil } from "src/shared/mutations/setUnavailableUntil";

const GET_UNAVAILABLE_DATE = gql`
  query getUnavailableDate {
    viewer {
      ... on Specialist {
        id
        unavailableUntil
      }
    }
  }
`;

function Unavailable({ timestamp, viewer }) {
  const [setUnavailable] = useSetUnavailableUntil();
  const date = DateTime.fromISO(timestamp).toFormat("dd MMMM yyyy");

  const handleClear = useCallback(
    (e) => {
      e.preventDefault();

      setUnavailable({
        variables: {
          input: {
            clear: true,
          },
        },
        optimisticResponse: {
          setUnavailableUntil: {
            __typename: "SetUnavailableUntilPayload",
            specialist: {
              ...viewer,
              unavailableUntil: null,
            },
          },
        },
      });
    },
    [setUnavailable, viewer],
  );

  return (
    <Box bg="neutral100" padding={4} borderRadius="8px">
      <Text fontSize="l" mb={2}>
        You have currently set yourself as unavailable until <b>{date}</b>.
      </Text>
      <Link.External href="#" onClick={handleClear}>
        Set Available
      </Link.External>
    </Box>
  );
}

function Available({ viewer }) {
  const [setUnavailable] = useSetUnavailableUntil();
  const popover = usePopoverState({ placement: "bottom-start" });

  const handleDaySelection = useCallback(
    (date) => {
      popover.hide();

      setUnavailable({
        variables: {
          input: {
            date: date.toISOString(),
          },
        },
        optimisticResponse: {
          setUnavailableUntil: {
            __typename: "SetUnavailableUntilPayload",
            specialist: {
              ...viewer,
              unavailableUntil: date.toISOString(),
            },
          },
        },
      });
    },
    [setUnavailable, popover, viewer],
  );

  const isDayDisabled = (day) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    day.setHours(0, 0, 0, 0);
    return day <= now;
  };

  return (
    <>
      <PopoverDisclosure
        as={Button}
        {...popover}
        aria-label="Set available date"
        variant="dark"
      >
        Set Available Date
      </PopoverDisclosure>
      <Popover
        {...popover}
        aria-label="Set available date"
        style={{ zIndex: 999, position: "absolute" }}
      >
        <Card padding={4}>
          <DatePicker
            showOutsideDays={false}
            onDayClick={handleDaySelection}
            disabledDays={isDayDisabled}
          />
        </Card>
      </Popover>
    </>
  );
}

export default function Availability() {
  const { data, loading, error } = useQuery(GET_UNAVAILABLE_DATE);
  const unavailableUntil = data?.viewer?.unavailableUntil;

  const isAvailable = useMemo(() => {
    if (!unavailableUntil) return true;
    const now = DateTime.local();
    const date = DateTime.fromISO(unavailableUntil);
    return date < now;
  }, [unavailableUntil]);

  if (loading) return <Loading />;
  if (error) return <>something went wrong</>;

  return (
    <Card padding={10} borderRadius="12px">
      <Text
        marginBottom={2}
        fontSize="3xl"
        fontWeight="medium"
        color="neutral900"
        letterSpacing="-0.02rem"
      >
        Availability
      </Text>
      <Text fontSize="l" lineHeight="1.2" color="neutral800" mb={6}>
        If you don&apos;t have any availability for work at the moment you can
        set a date when you will be available again below and we won&apos;t
        notify you about any other projects until then.
      </Text>
      {isAvailable ? (
        <Available viewer={data?.viewer} />
      ) : (
        <Unavailable timestamp={unavailableUntil} viewer={data?.viewer} />
      )}
    </Card>
  );
}
