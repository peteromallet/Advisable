import React from "react";
import styled, { css } from "styled-components";
import { Box, Text, theme } from "@advisable/donut";
import { Thanks } from "@guild/icons";
import ReactTooltip from "react-tooltip";

const ReactionsButton = ({
  onUpdatePostReactions,
  reactionsCount,
  reacted,
}) => {
  return (
    <StyledButton
      px="s"
      py="xxs"
      display="flex"
      alignSelf="flex-start"
      alignItems="center"
      background="white"
      borderRadius={8}
      reacted={reacted}
      onClick={onUpdatePostReactions}
      data-tip="Give Thanks"
    >
      <ReactTooltip backgroundColor={theme.colors.catalinaBlue100} />
      <Text fontSize="xs" mr="xs" color={reacted ? "white" : "catalinaBlue100"}>
        {reactionsCount || "0"}
      </Text>
      <Thanks size={18} />
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
    svg {
      fill: ${(props) => (props.reacted ? "white" : theme.colors.froly50)};
      transition: fill 0.2s ease;
    }
  }
  ${({ reacted }) =>
    reacted &&
    css`
      background: ${theme.colors.froly50};
      svg {
        fill: white;
        transition: fill 0.2s ease;
      }
    `}
`;

export default ReactionsButton;
