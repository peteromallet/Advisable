// Renders the modal for when the client clicks "start working with X" to create
// a new booking.
import * as React from "react";
import { graphql } from "react-apollo";
import Text from "../Text";
import Modal from "../Modal";
import Heading from "../Heading";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import { Padding } from "../Spacing";
import START_WORKING from "./startWorking.graphql";

const Component = ({ isOpen, onClose, firstName, applicationId, mutate, onCreate }) => {
  const [loading, setLoading] = React.useState(false);

  const handleContinue = async () => {
    setLoading(true);
    const response = await mutate({
      variables: {
        input: { application: applicationId },
      },
    });

    const { errors } = response.data.createBooking;

    if (!errors) {
      onCreate(booking)
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Padding size="l" bottom="m">
        <Heading level={3}>Start working with {firstName}</Heading>
      </Padding>
      <Padding left="l" right="l">
        <Text size="s">
          This will create a new booking with {firstName}. From there you will
          be able to add and assign tasks for them to start working on.
        </Text>
      </Padding>
      <Padding size="l">
        <ButtonGroup fullWidth>
          <Button styling="primary" loading={loading} onClick={handleContinue}>
            Continue
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonGroup>
      </Padding>
    </Modal>
  );
};

export default graphql(START_WORKING)(Component);
