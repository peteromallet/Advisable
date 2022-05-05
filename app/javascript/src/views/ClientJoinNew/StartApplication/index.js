import React from "react";
import { Box, Text, Link, Heading } from "@advisable/donut";
import Button from "src/components/Button";
import LoginWithGoogle from "src/views/Login/LoginWithGoogle";
import Divider from "src/components/Divider";

export default function StartApplication() {
  return (
    <>
      <Box textAlign="center" marginBottom={8}>
        <Heading size="4xl" marginBottom={3}>
          Get started
        </Heading>
        <Text fontSize="lg" color="neutral700">
          Already have an account?{" "}
          <Link to="/login" variant="underlined">
            Login
          </Link>
        </Text>
      </Box>
      <LoginWithGoogle size="xl" mode="user" navigate="/setup">
        Signup with Google
      </LoginWithGoogle>
      <Divider py={6}>Or</Divider>
      <Button
        to="/freelancers/join"
        size="lg"
        variant="secondary"
        className="w-full"
      >
        Signup with email
      </Button>
      <Divider py={8} />
      <Box textAlign="center">
        <Text
          fontWeight={480}
          fontSize="md"
          marginBottom={2}
          color="neutral700"
          letterSpacing="-0.016em"
        >
          Looking to create a freelancer account?
        </Text>
        <Link to="/freelancers/join" fontSize="m" variant="underlined">
          Signup as a freelancer
        </Link>
      </Box>
    </>
  );
}
