import React, { useState } from "react";
import Loading from "../Loading";
import { DateTime } from "luxon";
import { Availability, useBreakpoint } from "@advisable/donut";
import Button from "../Button";
import { useAvailability, useUpdateAvailability } from "./queries";
import AvailabilityInput from "../AvailabilityInput";
import TimezoneSelect from "./TimezoneSelect";

function AvailabilityForm({ data, onSubmit }) {
  const sup = useBreakpoint("sUp");
  const [timezone, setTimezone] = useState(DateTime.local().zoneName || "UTC");
  const [updateAvailability, { loading }] = useUpdateAvailability();
  const [availability, setAvailability] = useState(
    data.viewer.availability || [],
  );

  const handleSubmit = async () => {
    await updateAvailability({
      variables: { input: { availability } },
    });
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
              label: `Interview with ${i.specialist.firstName}`,
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
          Continue
        </Button>
      )}
    </>
  );
}

export default function RequestCallAvailability({
  state,
  onSubmit,
  specialist,
}) {
  const { data, loading, error } = useAvailability();

  return (
    <>
      <div className="px-8 pb-8">
        <p className="text-center mb-6">
          Request a 30 minute call with {specialist.firstName} to talk about
          your project. Please select your available times below.
        </p>
        {loading && <Loading />}
        {error && <p>Error</p>}
        {!loading && data && (
          <AvailabilityForm data={data} onSubmit={onSubmit} />
        )}
      </div>
      <div className="py-6 px-8 border-t border-solid border-neutral100">
        <h5 className="font-medium leading-none mb-0.5">
          Want to just send a message instead?
        </h5>
        <button
          className="text-blue600 hover:text-blue800"
          onClick={state.message}
        >
          Message {specialist.firstName}
        </button>
      </div>
    </>
  );
}
