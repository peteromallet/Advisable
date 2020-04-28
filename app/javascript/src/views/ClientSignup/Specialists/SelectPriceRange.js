import React from "react";
import { useHistory } from "react-router-dom";
import { ArrowLeft, Tag, ThumbsUp, Award } from "@styled-icons/feather";
import { Box, Link, Text } from "@advisable/donut";
import { groupByPriceRange } from "./rangeHelpers";
import Range from "./Range";

function SelectPriceRange({ specialists }) {
  const history = useHistory();
  const byPriceRange = groupByPriceRange(specialists);

  return (
    <Box maxWidth={1100} margin="0 auto" px="m" py="xl">
      <Link.External href="#" onClick={history.goBack} mb="xs">
        <Box display="inline-block" mr="xxs">
          <ArrowLeft size={16} strokeWidth={2} />
        </Box>
        Back
      </Link.External>
      <Text
        as="h2"
        mb="xs"
        color="blue.8"
        fontSize="xxxl"
        lineHeight="xxxl"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        What level of specialist are you looking for?
      </Text>
      <Box maxWidth={550} mb="xl">
        <Text color="neutral.9" lineHeight="m">
          Let us know what you are looking for so that we can find the perfect
          specialist for you.
        </Text>
      </Box>

      <Box display={{ _: "block", m: "flex" }} mb="xxl" mx="-15px">
        <Range
          name="Budget"
          icon={<Tag size={24} strokeWidth={2} />}
          specialists={byPriceRange[0]}
        />
        <Range
          name="Proven"
          icon={<ThumbsUp size={24} strokeWidth={2} />}
          specialists={byPriceRange[1]}
          animationDelay={0.1}
        />
        <Range
          name="World Class"
          icon={<Award size={24} strokeWidth={2} />}
          specialists={byPriceRange[2]}
          animationDelay={0.2}
        />
      </Box>
    </Box>
  );
}

export default SelectPriceRange;
