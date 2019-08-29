import React from "react";
import { Alert, Box, Card, Text, Link, Icon } from "@advisable/donut";
import { Beacon } from "./styles";

const OnHold = () => {
  return (
    <Box maxWidth={600} margin="50px auto">
      <Alert
        mb="m"
        icon="refresh-ccw"
        title="Your account is currently on hold"
      >
        We evaluate and accept freelancers as they apply for projects, but
        unfortunately we don’t have any relevant projects for you at this time.
      </Alert>
      <Card padding="xl" borderRadius={8} elevation="m">
        <Beacon>
          <Icon icon="search" color="white.9" />
        </Beacon>
        <Box maxWidth={485} margin="0 auto">
          <Text
            mb="s"
            size="xxl"
            weight="medium"
            color="neutral.9"
            textAlign="center"
          >
            We are looking for projects that we think are suitable for you
          </Text>
          <Text textAlign="center" size="m" lineHeight="m" color="neutral.7">
            We will let you know once we find a suitable project. To make sure
            we know which projects to inform you about, please make sure your
            profile is detailed and up to date.
          </Text>
          <Text textAlign="center" mt="m">
            <Link to="/profile">Update profile</Link>
          </Text>
        </Box>
      </Card>
    </Box>
  );
};

export default OnHold;
