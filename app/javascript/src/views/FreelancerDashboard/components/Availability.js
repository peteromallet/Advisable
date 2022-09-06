import React, { useCallback } from "react";
import { DateTime } from "luxon";
import { Skeleton } from "@advisable/donut";
import composeStyles from "src/utilities/composeStyles";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import { useSetUnavailableUntil } from "src/shared/mutations/setUnavailableUntil";
import DatePicker from "src/components/DatePicker";
import { useNotifications } from "src/components/Notifications";

const availabilityButtonClasses = composeStyles({
  base: `
    inline-flex
    gap-2.5
    items-center
    ring-1 hover:ring-0 ring-neutral200
    p-2 px-4
    rounded-sm
    hover:bg-white
    hover:shadow-lg
    transition-all
    cursor-pointer
  `,
  variants: {
    active: `
      shadow-lg
      bg-white
      !ring-1 ring-neutral200 
    `,
  },
});

const indicatorClasses = composeStyles({
  base: "w-[8px] h-[8px] rounded-full bg-neutral500",
  variants: {
    available: "!bg-green-600",
  },
});

const AvailabilityButton = ({ popover, isAvailable }) => {
  return (
    <PopoverDisclosure
      className={availabilityButtonClasses({
        active: popover.visible,
      })}
      title="Change availability"
      {...popover}
    >
      <div className={indicatorClasses({ available: isAvailable })} />
      <div className="text-neutral800">
        {isAvailable ? "Available for projects" : "Unavailable for projects"}
      </div>
    </PopoverDisclosure>
  );
};

const AvailablePopover = ({ popover }) => {
  const [setUnavailable] = useSetUnavailableUntil();
  const notifications = useNotifications();

  const handleDaySelection = useCallback(
    async (date, modifiers) => {
      if (modifiers.disabled) return;

      popover.hide();

      const response = await setUnavailable({
        variables: {
          input: {
            date: DateTime.fromJSDate(date).toISODate(),
          },
        },
      });

      if (response.errors) {
        notifications.error("Something went wrong, please try again.");
      } else {
        notifications.notify("Your availability has been updated.");
      }
    },
    [popover, setUnavailable, notifications],
  );

  const isDayDisabled = (day) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    day.setHours(0, 0, 0, 0);
    return day <= now;
  };
  return (
    <Popover
      {...popover}
      aria-label="Pause availability"
      style={{ zIndex: 999, position: "absolute" }}
    >
      <div className="bg-neutral200 ring-1 ring-blue300 rounded-sm drop-shadow-xl overflow-hidden">
        <div className="px-4 py-3">
          <h4 className="font-semibold text-neutral900">Pause availability</h4>
          <p className="text-neutral900 max-w-[220px] text-sm leading-5">
            Set a date when you will be available again
          </p>
        </div>
        <div className="p-2 pt-0">
          <DatePicker
            className="bg-white p-2 rounded-sm"
            showOutsideDays={false}
            onDayClick={handleDaySelection}
            disabledDays={isDayDisabled}
          />
        </div>
      </div>
    </Popover>
  );
};

const UnavailablePopover = ({ popover, unavailableUntil }) => {
  const [setUnavailable] = useSetUnavailableUntil();
  const date = DateTime.fromISO(unavailableUntil).toFormat("dd MMMM yyyy");
  const notifications = useNotifications();

  const handleClear = useCallback(
    async (e) => {
      e.preventDefault();
      popover.hide();

      const response = await setUnavailable({
        variables: {
          input: {
            clear: true,
          },
        },
      });

      if (response.errors) {
        notifications.error("Something went wrong, please try again.");
      } else {
        notifications.notify("Your availability has been updated.");
      }
    },
    [notifications, popover, setUnavailable],
  );

  return (
    <Popover
      {...popover}
      aria-label="Set you're available again"
      style={{ zIndex: 999, position: "absolute" }}
    >
      <div className="bg-white ring-1 ring-blue300 rounded-sm drop-shadow-xl overflow-hidden p-4 pb-4 max-w-[300px]">
        <p className="text-neutral900 mb-1.5">
          You have currently set yourself as unavailable until{" "}
          <b className="font-medium">{date}</b>.
        </p>
        <button className="text-blue500 font-semibold" onClick={handleClear}>
          Set as Available
        </button>
      </div>
    </Popover>
  );
};

export default function Availability({ unavailableUntil, loading }) {
  const popover = usePopoverState({ placement: "bottom-start" });
  const isAvailable = unavailableUntil
    ? DateTime.fromISO(unavailableUntil) <= DateTime.now()
    : true;

  if (loading) return <Skeleton width="214px" height="40px" />;

  return (
    <>
      <AvailabilityButton
        popover={popover}
        aria-label="Set available date"
        isAvailable={isAvailable}
      />
      {isAvailable ? (
        <AvailablePopover popover={popover} />
      ) : (
        <UnavailablePopover
          popover={popover}
          unavailableUntil={unavailableUntil}
        />
      )}
    </>
  );
}
