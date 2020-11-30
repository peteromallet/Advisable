import React from "react";
import { Box, Link, Text } from "@advisable/donut";

export default function HaveAccount() {
  return (
    <Box ml="auto" display="flex" flexDirection="column">
      <Text color="neutral600" mb={1.5}>
        Already have an account?
      </Text>
      <Link to="/login" fontWeight="medium" color="blue500" ml="auto">
        Login
      </Link>
    </Box>
  );
}
