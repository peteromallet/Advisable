import React from "react";
import { Box } from "@advisable/donut";
import { Mutation } from "react-apollo";
import Text from "src/components/Text";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import ButtonGroup from "src/components/ButtonGroup";
import REQUEST_MORE_TIMES from "./requestMoreTimes.graphql";

const RequestMoreAvailability = ({
  isOpen,
  onClose,
  interviewID,
  clientName,
}) => {
  return (
    <Mutation mutation={REQUEST_MORE_TIMES}>
      {(requestMoreTimes, { loading }) => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <Box padding="l">
            <Heading marginBottom="s">Request more availability</Heading>
            <Text marginBottom="l">
              We will request more availability from {clientName} and let you
              know when they respond.
            </Text>
            <ButtonGroup fullWidth>
              <Button
                size="l"
                styling="primary"
                loading={loading}
                onClick={() =>
                  requestMoreTimes({
                    variables: {
                      input: {
                        id: interviewID,
                      },
                    },
                  })
                }
              >
                Request
              </Button>
              <Button size="l" onClick={onClose}>
                Cancel
              </Button>
            </ButtonGroup>
          </Box>
        </Modal>
      )}
    </Mutation>
  );
};

export default RequestMoreAvailability;
