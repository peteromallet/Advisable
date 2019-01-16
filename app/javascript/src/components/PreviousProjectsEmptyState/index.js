import React, { useState } from "react";
import Text from "src/components/Text";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import RequestReferences from "src/components/RequestReferences";
import { Container } from "./styles";

export default ({ applicationId, name, referencesRequested }) => {
  const [open, setOpen] = useState(false);

  if (referencesRequested) {
    return (
      <Container>
        <Text size="s">
          We have requested references for {name}. We will let you know when we receive them.
        </Text>
      </Container>
    )
  }

  return (
    <Container>
      <Heading marginBottom="xs" level={5}>
        No previous projects
      </Heading>
      <Text marginBottom="m" size="s">
        {name} has not listed any previous projects yet. We can reach out to
        their previous clients and request references for you.
      </Text>
      <Button onClick={() => setOpen(true)} styling="plain">
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
};
