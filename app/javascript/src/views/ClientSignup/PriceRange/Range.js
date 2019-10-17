import React from "react";
import { minBy, maxBy } from "lodash";
import { Box, Icon, Text } from "@advisable/donut";
import { useHistory, useLocation } from "react-router-dom";
import currency from "../../../utilities/currency";
import { StyledRange, StyledRangeTitle, StyledRangeIcon } from "./styles";

const Range = ({ name, icon, specialists }) => {
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    history.push({
      pathname: "/clients/signup/specialists",
      state: {
        ...location.state,
        results: specialists,
      },
    });
  };

  return (
    <StyledRange onClick={handleClick}>
      <StyledRangeIcon>
        <Icon width={20} icon={icon} strokeWidth={1.6} color="blue.5" />
      </StyledRangeIcon>
      <Box flex="1">
        <StyledRangeTitle fontWeight="medium" mb="xxs">
          {name}
        </StyledRangeTitle>
        <Text size="xs" color="neutral.7">
          {currency(minBy(specialists, "hourlyRate").hourlyRate, {
            format: "$0",
          })}
          {" - "}
          {currency(maxBy(specialists, "hourlyRate").hourlyRate, {
            format: "$0",
          })}
          <Text fontSize="xxs" as="span" color="neutral.6">
            {" /hour"}
          </Text>
        </Text>
      </Box>
      <Box>
        <Icon icon="chevron-right" color="neutral.3" />
      </Box>
    </StyledRange>
  );
};

export default Range;
