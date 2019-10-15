import React from "react";
import { get } from "lodash";
import { useLocation, useHistory } from "react-router-dom";
import { Box, Text } from "@advisable/donut";
import Logo from "../../../components/Logo";
import Testimonials from "../Testimonials";
import groupByPriceRange from "./groupByPriceRange";
import Range from "./Range";

const PriceRange = () => {
  const location = useLocation();
  const history = useHistory();
  const results = get(location, "state.results");
  const byPriceRange = groupByPriceRange(results);

  React.useEffect(() => {
    if (results.length < 6) {
      history.replace({
        pathname: "/clients/signup/specialists",
        state: location.state,
      });
    }
  }, [history, location, results]);

  return (
    <Box paddingRight={{ _: null, l: 550 }}>
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
      <Box display={{ _: "none", l: "block" }}>
        <Testimonials />
      </Box>
    </Box>
  );
};

export default PriceRange;
