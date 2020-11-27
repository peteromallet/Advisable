import React from "react";
import { useHistory } from "react-router";
import { Box, Link, Text } from "@advisable/donut";

export default function HaveAccount() {
  const history = useHistory();
  return (
    <Box ml="auto" display="flex" flexDirection="column">
      <Text color="neutral600" mb={1.5}>
        Already have an account?
      </Text>
      <Link
        onClick={() => history.push("/login")}
        fontWeight="medium"
        color="blue500"
        ml="auto"
      >
        Login
      </Link>
    </Box>
  );
}
