import React from "react";
import styled, { css, keyframes } from "styled-components";
import { Text, theme } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import { DownArrow } from "@guild/icons";

const ShowMore = ({ showingMore, onToggle, text }) => (
  <StyledButton
    showingMore={showingMore}
    spaceChildrenHorizontal={4}
    onClick={onToggle}
  >
    <DownArrow size={22} />
    <Text size="xs" color="catalinaBlue100">
      {showingMore ? text.less : text.more}
    </Text>
  </StyledButton>
);

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const StyledButton = styled(GuildBox)`
  border-radius: 30px;
  text-align: center;
  letter-spacing: -0.01em;
  padding: 6px 14px;
  width: 100px;
  max-height: 32px;
  background: ${theme.colors.aliceBlue};
  filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.08));

  &:hover {
    cursor: pointer;
    filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.1));
  }

  ${({ showingMore }) =>
    showingMore &&
    css`
      svg {
        transform: scaleY(-1);
        animation: ${rotate} 220ms linear;
      }
    `}
`;

ShowMore.defaultProps = {
  text: { less: "Less", more: "More" },
};

export default ShowMore;
