import * as React from "react";
import { Plus } from "@styled-icons/feather";
import { DialogDisclosure, Button, Text, Card } from "@advisable/donut";

const NoReferences = ({ confirmationModal, newProjectModal }) => {
  return (
    <Card padding="l">
      <Text as="h2" mb="xs" fontSize="xl" color="blue900" fontWeight="medium">
        It looks like you haven't added any previous projects.
      </Text>
      <Text mb="l" lineHeight="m" color="neutral700">
        We require references from all freelancers prior to their first project
        on Advisable. We do this to ensure that their self-reported experience
        is verified by a third party. Only once verified will these references
        be shown on your profile and visible to clients.
      </Text>
      <DialogDisclosure
        mr="xs"
        as={Button}
        prefix={<Plus />}
        {...newProjectModal}
      >
        Add a previous project
      </DialogDisclosure>
      <DialogDisclosure as={Button} variant="subtle" {...confirmationModal}>
        I don't want to provide references
      </DialogDisclosure>
    </Card>
  );
};

export default NoReferences;
