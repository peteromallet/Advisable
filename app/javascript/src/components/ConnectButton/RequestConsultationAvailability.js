import { DateTime } from "luxon";
import { Box, Button, Text } from "@advisable/donut";
import React, { useState } from "react";
import Loading from "src/components/Loading";
import { useAvailability, useUpdateAvailability } from "./queries";
import AvailabilityInput from "../AvailabilityInput";
import RequestConsultationHeader from "./RequestConsultationHeader";
import TimezoneSelect from "./TimezoneSelect";

function AvailabilityForm({ data, onSubmit }) {
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
      <Box marginBottom={6}>
        <AvailabilityInput
          maxHeight="40vh"
          value={availability}
          timezone={timezone}
          onChange={setAvailability}
          events={data.viewer.interviews?.map((i) => ({
            time: i.startsAt,
            label: `Interview with ${i.specialist.firstName}`,
          }))}
        />
        <Box marginY={4}>
          <TimezoneSelect
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
        </Box>
      </Box>
      {availability.length < 6 ? (
        <Text color="neutral600" marginTop={5} letterSpacing="-0.01em">
          Please select at least 6 available times to continue
        </Text>
      ) : (
        <Button
          variant="gradient"
          width="100%"
          size="l"
          onClick={handleSubmit}
          loading={loading}
        >
          Continue
        </Button>
      )}
    </>
  );
}

export default function RequestConsultationAvailability({
  specialist,
  onSubmit,
}) {
  const { data, loading, error } = useAvailability();

  return (
    <>
      <RequestConsultationHeader specialist={specialist} />
      {loading && <Loading />}
      {!loading && data && <AvailabilityForm data={data} onSubmit={onSubmit} />}
      {error && <>Failed to load availability</>}
    </>
  );
}
