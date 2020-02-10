import React from "react";
import { get } from "lodash";
import { useLocation, Redirect } from "react-router-dom";
import { Box, Text } from "@advisable/donut";
import groupByPriceRange from "./groupByPriceRange";
import Range from "./Range";

const PriceRange = () => {
  const location = useLocation();
  const results = get(location, "state.results");

  if (results.nodes.length === 0) {
    return (
      <Redirect
        to={{
          pathname: "/clients/signup/save",
          search: location.search,
          state: location.state,
        }}
      />
    );
  }

  if (results.nodes.length <= 6) {
    return (
      <Redirect
        to={{
          pathname: "/clients/signup/specialists",
          search: location.search,
          state: location.state,
        }}
      />
    );
  }

  const byPriceRange = results ? groupByPriceRange(results.nodes) : [];

  if (!results) {
    return <Redirect to="/clients/signup" />;
  }

  return (
    <Box maxWidth={600} margin="0 auto" px="m" py="xl">
      <Text
        pr="m"
        as="h2"
        mb="xs"
        color="blue.8"
        fontSize="30px"
        lineHeight="28px"
        fontWeight="semibold"
        letterSpacing="-0.035em"
      >
        What level of specialist are you looking for?
      </Text>
      <Text fontSize="l" color="neutral.8" lineHeight="m" mb="l">
        Let us know what you are looking for so that we can find the perfect
        specialist for you.
      </Text>
      <Range name="Budget" icon="tag" specialists={byPriceRange[0]} />
      <Range name="Proven" icon="thumbs-up" specialists={byPriceRange[1]} />
      <Range name="World Class" icon="award" specialists={byPriceRange[2]} />
    </Box>
  );
};

export default PriceRange;
