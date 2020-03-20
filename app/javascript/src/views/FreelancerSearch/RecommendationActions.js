import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Icon, RoundedButton } from "@advisable/donut";

export default function RecommendationAction({
  search,
  firstName,
  specialistID,
}) {
  const location = useLocation();
  return (
    <Box flexShrink={0}>
      <RoundedButton
        as={Link}
        mb={{ _: "xs", l: 0 }}
        width={{ _: "100%", l: "auto" }}
        to={`/freelancer_search/${search.id}/results`}
        variant="subtle"
        size="l"
      >
        See other matches
      </RoundedButton>
      <RoundedButton
        as={Link}
        ml={{ _: null, l: "xs" }}
        width={{ _: "100%", l: "auto" }}
        prefix={<Icon icon="message-circle" />}
        to={{
          ...location,
          pathname: `/freelancer_search/${search.id}/topic`,
          state: {
            freelancers: [specialistID],
          },
        }}
        size="l"
      >
        Talk with {firstName}
      </RoundedButton>
    </Box>
  );
}
