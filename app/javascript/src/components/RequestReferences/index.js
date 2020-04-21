import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Box, RoundedButton, Text } from "@advisable/donut";
import Modal from "../Modal";
import { withNotifications } from "../Notifications";
import REQUEST_REFERENCES from "./requestReferences.graphql";

const RequestReferences = ({
  isOpen,
  onClose,
  name,
  applicationId,
  notifications,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [requestReferences] = useMutation(REQUEST_REFERENCES);

  const handleSubmit = async () => {
    setLoading(true);
    await requestReferences({
      variables: {
        input: {
          id: applicationId,
        },
      },
    });
    setLoading(false);
    notifications.notify(`References have been requested for ${name}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box padding="l">
        <Text
          color="blue900"
          fontSize="xl"
          fontWeight="semibold"
          marginBottom="s"
        >
          Request References For {name}
        </Text>
        <Text marginBottom="l" lineHeight="m" color="neutral700">
          Do you need validated references and reviews for {name}? We can reach
          out to their previous clients in order to get feedback on their past
          projects and performance and share the results with you.
        </Text>
        <RoundedButton loading={isLoading} onClick={handleSubmit} mr="xs">
          Request References
        </RoundedButton>
        <RoundedButton variant="subtle" onClick={onClose}>
          Cancel
        </RoundedButton>
      </Box>
    </Modal>
  );
};

export default withNotifications(RequestReferences);
