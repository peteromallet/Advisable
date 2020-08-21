import React, { useEffect } from "react";
import { Text, Button } from "@advisable/donut";
import AvailabilityInput from "components/AvailabilityInput";
import ActionBarModal from "./ActionBarModal";
import { useAvailability, useUpdateAvailability } from "./queries";

export default function UpdateAvailability({ dialog, onUpdate }) {
  const { loading, data } = useAvailability({
    skip: !dialog.visible,
  });

  const [
    updateAvailability,
    updateAvailabilityResponse,
  ] = useUpdateAvailability();
  const [availability, setAvailability] = React.useState([]);

  useEffect(() => {
    if (!loading) {
      setAvailability(data?.viewer?.availability || []);
    }
  }, [data, loading, setAvailability]);

  const handleContinue = async () => {
    await updateAvailability({
      variables: {
        input: {
          id: data.viewer.id,
          availability,
        },
      },
    });

    onUpdate();
  };

  const events = data?.viewer?.interviews?.map((i) => ({
    time: i.startsAt,
    label: `Interview with ${i.specialist.firstName}`,
  }));

  return (
    <ActionBarModal width={800} dialog={dialog} label="Update availability">
      {loading ? (
        <>loading..</>
      ) : (
        <>
          <Text fontSize="xxl" letterSpacing="-0.04em" marginBottom="8px">
            You have not added any availability
          </Text>
          <Text lineHeight="20px" color="neutral700" marginBottom="24px">
            You have not added any availability yet. We will offer these times
            to freelancers you accept to schedule a call with them.
          </Text>
          <AvailabilityInput
            maxHeight="350px"
            value={availability}
            onChange={setAvailability}
            events={events}
          />
          <Button
            marginTop="24px"
            variant="dark"
            onClick={handleContinue}
            loading={updateAvailabilityResponse.loading}
          >
            Continue
          </Button>
        </>
      )}
    </ActionBarModal>
  );
}
