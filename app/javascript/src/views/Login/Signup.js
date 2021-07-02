import React from "react";
import { Link as RouteLink } from "react-router-dom";
import Flash from "src/components/Flash";
import { Box, Button, Card, Text, Link } from "@advisable/donut";
import Logo from "src/components/Logo";

export default function Signup() {
  return (
    <Box
      pb="2"
      mx="auto"
      px={["6", "0"]}
      pt={["10", "80px"]}
      maxWidth={["100%", 460]}
      position="relative"
      zIndex={2}
    >
      <Box textAlign={["left", "center"]} mb={8}>
        <Logo />
      </Box>
      <Card
        p={["0", "10"]}
        elevation={["none", "m"]}
        variant={["ghost", "white"]}
        borderRadius="12px"
        marginBottom={6}
      >
        <Text
          mb="1"
          as="h3"
          fontSize="5xl"
          color="neutral900"
          fontWeight="medium"
          letterSpacing="-0.06rem"
          textAlign="center"
        >
          Apply to Advisable
        </Text>
        <Text
          mb="6"
          color="neutral700"
          letterSpacing="-0.01rem"
          textAlign="center"
        >
          Would you like to signup as a client or a specialist?
        </Text>
        <Flash name="notice" variant="orange" marginBottom={4} />
        <Button
          as={RouteLink}
          to="/clients/join"
          width="100%"
          size="l"
          variant="subtle"
          mb={2}
        >
          Apply as a client
        </Button>
        <Button
          as={RouteLink}
          to="/freelancers/join"
          width="100%"
          size="l"
          variant="subtle"
        >
          Apply as a specialist
        </Button>
      </Card>

      <Box textAlign="center">
        <Text fontWeight="medium" mb={2}>
          Already have an account?
        </Text>
        <Link fontSize="s" variant="underlined" to="/login">
          Login
        </Link>
      </Box>
    </Box>
  );
}
