import React, { useState } from "react";
import { DateTime } from "luxon";
import commaSeparated from "src/utilities/commaSeparated";
import { Availability, useBreakpoint } from "@advisable/donut";
import AvailabilityInput from "../AvailabilityInput";
import { useUpdateAvailability } from "./queries";
import TimezoneSelect from "./TimezoneSelect";
import Button from "../Button";

export default function AvailabilityForm({ data, onSubmit }) {
  const sup = useBreakpoint("sUp");
  const [timezone, setTimezone] = useState(DateTime.local().zoneName || "UTC");
  const [updateAvailability, { loading }] = useUpdateAvailability();
  const [availability, setAvailability] = useState(
    data.viewer.availability || [],
  );

  const handleSubmit = async () => {
    await updateAvailability({ variables: { input: { availability } } });
    onSubmit(availability);
  };

  return (
    <>
      <div className="mb-6">
        {sup ? (
          <AvailabilityInput
            maxHeight="300px"
            value={availability}
            timezone={timezone}
            onChange={setAvailability}
            events={data.viewer.interviews?.map((i) => ({
              time: i.startsAt,
              label: `Call with ${commaSeparated(
                i.accounts.map((p) => p.firstName),
              )}`,
            }))}
          />
        ) : (
          <div className="mb-8">
            <Availability
              timezone={timezone}
              value={availability}
              onChange={setAvailability}
            />
          </div>
        )}
        <div className="pt-4">
          <TimezoneSelect
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
        </div>
      </div>
      {availability.length < 6 ? (
        <p className="text-neutral600 mt-5">
          Please select at least 6 available times to continue
        </p>
      ) : (
        <Button
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          loading={loading}
        >
          Next
        </Button>
      )}
    </>
  );
}
