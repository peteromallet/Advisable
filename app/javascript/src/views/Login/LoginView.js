import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { Box, Card, Text, Link } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import Logo from "src/components/Logo";
import LoginForm from "./LoginForm";

export default function LoginView() {
  const viewer = useViewer();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const { from } = location.state || {
    from: { pathname: "/" },
  };

  if (viewer) {
    if (queryParams.redirect) {
      window.location.href = queryParams.redirect;
    } else {
      return <Navigate to={from} />;
    }
  }

  return (
    <Box
      pb="2"
      mx="auto"
      px={["6", "0"]}
      pt={["10", "80px"]}
      maxWidth={["100%", 460]}
    >
      <div className="mb-8 grid place-items-center">
        <Logo />
      </div>
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
          Welcome Back!
        </Text>
        <Text
          mb="6"
          color="neutral700"
          letterSpacing="-0.01rem"
          textAlign="center"
        >
          Please sign in to your account
        </Text>
        <LoginForm />
      </Card>

      <Box textAlign="center">
        <Text fontWeight="medium" mb={2}>
          Don&apos;t have an account?
        </Text>
        <Link fontSize="s" variant="underlined" to="/login/signup">
          Signup
        </Link>
      </Box>
    </Box>
  );
}
