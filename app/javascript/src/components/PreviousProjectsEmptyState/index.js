import React, { useState } from "react";
import { Text, Button } from "@advisable/donut";
import RequestReferences from "src/components/RequestReferences";
import { Container } from "./styles";

export default function PreviousProjectsEmptyState({
  applicationId,
  name,
  referencesRequested,
}) {
  const [open, setOpen] = useState(false);

  if (referencesRequested) {
    return (
      <Container>
        <Text size="s">
          We have requested references for {name}. We will let you know when we
          receive them.
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <Text marginBottom="m" color="neutral700" lineHeight="m">
        {name} has not listed any previous projects yet. We can reach out to
        their previous clients and request references for you.
      </Text>
      <Button onClick={() => setOpen(true)} variant="subtle" size="s">
        Request references
      </Button>

      <RequestReferences
        name={name}
        isOpen={open}
        onClose={() => setOpen(false)}
        applicationId={applicationId}
      />
    </Container>
  );
}
