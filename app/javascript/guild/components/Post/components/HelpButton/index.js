import React from "react";
import styled from "styled-components";
import { Box, Text, theme } from "@advisable/donut";
import ReactTooltip from "react-tooltip";
import pluralize from "@advisable-main/utilities/pluralize";
import { OfferHelp } from "@guild/icons";
import { GuildBox } from "@guild/styles";

const HelpButton = ({ engagements, onToggle }) => {
  const tooltipContent = engagements
    ? `${pluralize(engagements, "person has", "people have")} offered help`
    : "Offer help";

  return (
    <StyledButton
      px="s"
      py="xxs"
      display="flex"
      alignSelf="flex-start"
      background="white"
      borderRadius={8}
      onClick={onToggle}
      data-tip={tooltipContent}
      minWidth="54px"
    >
      <ReactTooltip backgroundColor={theme.colors.catalinaBlue100} />
      <GuildBox flexCenterBoth spaceChildrenHorizontal={4}>
        <Text fontSize="xs" color="catalinaBlue100">
          {engagements}
        </Text>
        <OfferHelp size={16} />
      </GuildBox>
    </StyledButton>
  );
};

const StyledButton = styled(Box)`
  cursor: pointer;
  outline: none;
  box-shadow: ${theme.shadows.xs};
  svg {
    fill: ${theme.colors.catalinaBlue100};
  }
  &:hover {
    text-decoration: none;
  }
`;

export default HelpButton;
