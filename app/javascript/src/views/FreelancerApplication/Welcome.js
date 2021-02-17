import React from "react";
import { Box, Text, Link, Button } from "@advisable/donut";
import image from "./images/welcome-illustration.png";
import AnimatedCard from "./components/AnimatedCard";

export default function Welcome() {
  return (
    <AnimatedCard>
      <Box textAlign="center">
        <Box as="img" src={image} width="352px" marginBottom={6} />
        <Text
          color="#00404E"
          fontSize="5xl"
          fontWeight="medium"
          marginBottom={3}
        >
          Welcome to Advisable
        </Text>
        <Text fontSize="lg" color="neutral800" marginBottom={10}>
          We need to know a little more about you before we can find you some
          projects. Once you are accepted into the Advisable network we will
          begin matching you with projects where you can choose to apply or not.
        </Text>
        <Button as={Link} to="/freelancers/apply/introduction">
          Get Started
        </Button>
      </Box>
    </AnimatedCard>
  );
}
