import React from "react";
import { get } from "lodash";
import { useLocation, Redirect } from "react-router-dom";
import { Box, Text } from "@advisable/donut";
import Logo from "../../../components/Logo";
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
          state: location.state,
        }}
      />
    );
  }

  // if (results.nodes.length <= 6) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: "/clients/signup/specialists",
  //         state: location.state,
  //       }}
  //     />
  //   );
  // }

  const byPriceRange = results ? groupByPriceRange(results.nodes) : [];

  if (!results) {
    return <Redirect to="/clients/signup" />;
  }

  return (
    <Box maxWidth={600} margin="0 auto" px="m">
      <Box py="xl">
        <Logo />
      </Box>
      <Text
        as="h1"
        mb="xs"
        fontSize={30}
        letterSpacing={-0.5}
        fontWeight="semibold"
        color="neutral.9"
        lineHeight="30px"
      >
        What level of specialist are you looking for?
      </Text>
      <Text fontSize="s" lineHeight="s" color="neutral.7" mb="l">
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
