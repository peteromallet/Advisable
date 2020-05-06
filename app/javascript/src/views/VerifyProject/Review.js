import React from "react";
import { Link } from "react-router-dom";
import { Text, Box, Button } from "@advisable/donut";

function Review({ data }) {
  const { id, specialist } = data.previousProject;
  return (
    <>
      <Text
        mb="s"
        color="blue900"
        fontSize="24px"
        lineHeight="26px"
        fontWeight="semibold"
      >
        How was your experience working with {specialist.firstName}?
      </Text>
      <Button size="l" mr="xs">
        Continue
      </Button>
      <Link to={`/verify_project/${id}/validated`}>
        <Button size="l" variant="subtle">
          Skip
        </Button>
      </Link>
    </>
  );
}

export default Review;
