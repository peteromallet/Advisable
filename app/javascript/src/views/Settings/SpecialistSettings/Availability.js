import React, { useCallback, useMemo, useState } from "react";
import { DateTime } from "luxon";
import { useQuery, gql } from "@apollo/client";
import { Toggle, Card, Button } from "@advisable/donut";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import Loading from "src/components/Loading";
import DatePicker from "src/components/DatePicker";
import { useSetUnavailableUntil } from "src/shared/mutations/setUnavailableUntil";

const DISABLED_DATE = "2050-01-01";

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

function Unavailable({ timestamp }) {
  const [setUnavailable] = useSetUnavailableUntil();
  const date = DateTime.fromISO(timestamp).toFormat("dd MMMM yyyy");

  const handleClear = useCallback(
    async (e) => {
      e.preventDefault();

      await setUnavailable({
        variables: {
          input: {
            clear: true,
          },
        },
      });
    },
    [setUnavailable],
  );

  return (
    <div className="bg-neutral100 p-4 rounded-lg">
      <p className>
        You have currently set yourself as unavailable until{" "}
        <b className="font-medium">{date}</b>.
      </p>
      <a className="text-blue700" href="#" onClick={handleClear}>
        Set Available
      </a>
    </div>
  );
}

function Available() {
  const [setUnavailable] = useSetUnavailableUntil();
  const popover = usePopoverState({ placement: "bottom-start" });

  const handleDaySelection = useCallback(
    async (date, modifiers) => {
      if (modifiers.disabled) return;

      popover.hide();

      await setUnavailable({
        variables: {
          input: {
            date: DateTime.fromJSDate(date).toISODate(),
          },
        },
      });
    },
    [setUnavailable, popover],
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

function AvailabilityToggle({ isAvailableForWork }) {
  const [checked, setChecked] = useState(isAvailableForWork);
  const [setUnavailable] = useSetUnavailableUntil();

  const handleToggle = (e) => {
    setChecked((isChecked) => !isChecked);
    if (e.target.checked) {
      setUnavailable({
        variables: { input: { clear: true } },
      });
    } else {
      setUnavailable({
        variables: { input: { unavailable: true } },
      });
    }
  };

  return (
    <Toggle
      name="availableForWork"
      value={checked}
      checked={checked}
      onChange={handleToggle}
    />
  );
}

function PauseAvailability({ unavailableUntil, isAvailableForWork }) {
  const isAvailable = useMemo(() => {
    if (!unavailableUntil) return true;
    const now = DateTime.local();
    const date = DateTime.fromISO(unavailableUntil);
    return date < now;
  }, [unavailableUntil]);

  return (
    <div className={isAvailableForWork ? null : "opacity-50"}>
      <h5 className="text-lg font-medium">Pause availability</h5>
      <p className="mb-5">
        If you are temporarily unavailable for work you can set a date when you
        will be available again below and we won&apos;t recommend you for new
        projects or consultation requests until then.
      </p>
      {isAvailableForWork && isAvailable && <Available />}
      {isAvailableForWork && !isAvailable && (
        <Unavailable timestamp={unavailableUntil} />
      )}
    </div>
  );
}

export default function Availability() {
  const { data, loading, error } = useQuery(GET_UNAVAILABLE_DATE);
  const unavailableUntil = data?.viewer?.unavailableUntil;

  const isAvailableForWork = useMemo(() => {
    if (unavailableUntil === null) return true;

    const date = DateTime.fromISO(unavailableUntil);
    const disabledDate = DateTime.fromISO(DISABLED_DATE);
    return !disabledDate.hasSame(date, "day");
  }, [unavailableUntil]);

  if (loading) return <Loading />;
  if (error) return <>something went wrong</>;

  return (
    <Card padding={10} borderRadius="12px">
      <h1 className="text-2xl font-medium text-neutral900 tracking-tight">
        Availability
      </h1>
      <div className="h-px bg-neutral100 my-8" />
      <div className="flex gap-2 items-center">
        <div className="flex-1">
          <h5 className="text-lg font-medium">Available for work</h5>
          <p>
            Allow others to request calls or message you from your profile or
            case studies.
          </p>
        </div>
        <AvailabilityToggle isAvailableForWork={isAvailableForWork} />
      </div>
      <div className="h-px bg-neutral100 my-8" />
      <PauseAvailability
        unavailableUntil={unavailableUntil}
        isAvailableForWork={isAvailableForWork}
      />
    </Card>
  );
}
