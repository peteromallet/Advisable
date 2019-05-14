import React from "react";
import Text from "../../components/Text";
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import Padding from "../../components/Spacing/Padding";

const ApplicationsClosed = () => {
  return (
    <Container css="text-align: center;" size="s">
      <Padding bottom="s">
        <Heading size="s">Applications are closed</Heading>
      </Padding>
      <Text size="s">
        We're sorry but this project is no longer accepting applications. We
        will notify you whenever relevant opportunities come up that match your
        skillset.
      </Text>
    </Container>
  );
};

export default ApplicationsClosed;
