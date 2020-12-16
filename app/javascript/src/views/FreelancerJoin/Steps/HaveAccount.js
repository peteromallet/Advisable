import React from "react";
import { Box, Link, Text } from "@advisable/donut";

export default function HaveAccount() {
  return (
    <Box
      display="flex"
      flexDirection={{ m: "column" }}
      ml="auto"
      mr={{ xs: "auto", m: 0 }}
    >
      <Text color="neutral600" mb={{ m: 1.5 }} fontSize={["xs", "m"]}>
        Already have an account?
      </Text>
      <Link
        to="/login"
        color="blue500"
        fontWeight="medium"
        fontSize={["xs", "m"]}
        ml={{ xs: 2, m: "auto" }}
      >
        Login
      </Link>
    </Box>
  );
}
