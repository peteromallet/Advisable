import React from "react";
import { Box, Text, Button } from "@advisable/donut";
import illustration from "src/illustrations/zest/candidate.svg";
import { Link } from "react-router-dom";

export default function NoShortlists() {
  return (
    <Box maxWidth="520px" px={8} paddingBottom={8} mx="auto" textAlign="center">
      <img src={illustration} width="164px" />
      <Text
        fontSize="20px"
        fontWeight={600}
        marginBottom={2}
        marginTop={6}
        letterSpacing="-0.02rem"
      >
        You haven&apos;t created any shortlists
      </Text>
      <Text lineHeight="20px" marginBottom={6}>
        Find a specialist to hire by creating your first shortlist. We&apos;ll
        recommend you 5 people at a time to choose from.
      </Text>
      <Link to="/explore/new">
        <Button size="l">Create a shortlist</Button>
      </Link>
    </Box>
  );
}
