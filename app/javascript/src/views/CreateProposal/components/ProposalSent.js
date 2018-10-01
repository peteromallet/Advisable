import React from "react";
import Icon from "src/components/Icon";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import { Container } from "../styles";

export default ({ client }) => (
  <Container>
    <Card padding="xxl">
      <Spacing marginBottom="xl">
        <Icon height={60} width={60} stroke="#173FCD" icon="check-circle" />
      </Spacing>
      <Heading marginBottom="xs" center>
        Your proposal has been sent!
      </Heading>
      <Text center>We will let you know when we hear from {client.name}</Text>
    </Card>
  </Container>
);
