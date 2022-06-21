import React, { useState } from "react";
import { ArrowLeft, VideoCamera } from "@styled-icons/heroicons-solid";
import ConnectedAvatars from "./ConnectedAvatars";
import CircularButton from "../CircularButton";
import ModalHeading from "./ModalHeading";
import Loading from "../Loading";
import { DateTime } from "luxon";
import { Availability, useBreakpoint } from "@advisable/donut";
import Button from "../Button";
import { useAvailability, useUpdateAvailability } from "./queries";
import AvailabilityInput from "../AvailabilityInput";
import TimezoneSelect from "./TimezoneSelect";
import SubHeading from "./SubHeading";
import commaSeparated from "src/utilities/commaSeparated";

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
              label: `Call with ${commaSeparated(
                i.participants.map((p) => p.firstName),
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

export default function RequestCallAvailability({
  onSubmit,
  specialist,
  onBack,
}) {
  const { data, loading, error } = useAvailability();

  return (
    <>
      <div className="absolute top-3 left-3">
        <CircularButton icon={ArrowLeft} onClick={onBack} />
      </div>
      <>
        <ConnectedAvatars
          specialist={specialist}
          className="mb-4"
          icon={VideoCamera}
        />
        <ModalHeading>Request a call with {specialist.firstName}</ModalHeading>
        <SubHeading>
          Request a 30 minute call with {specialist.firstName} to talk about
          your project. Please select your available times below.
        </SubHeading>
        {loading && <Loading />}
        {error && <p>Error</p>}
        {!loading && data && (
          <AvailabilityForm data={data} onSubmit={onSubmit} />
        )}
      </>
    </>
  );
}
