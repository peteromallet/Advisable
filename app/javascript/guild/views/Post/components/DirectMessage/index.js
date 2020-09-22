import React from "react";
import styled, { css } from "styled-components";
import Messages from "@guild/icons/Messages";
import { theme } from "@advisable/donut";
import { GuildBox } from "@guild/styles";

const DirectMessage = ({ count }) => (
  <StyledBox flexCenterBoth count={count}>
    <Messages width={28} height={28} />
  </StyledBox>
);

const StyledBox = styled(GuildBox)`
  /* padding: 8px; */
  background: ${theme.colors.aliceBlue};
  border-radius: 50%;
  width: 45px;
  height: 45px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.12));

  svg {
    fill: ${theme.colors.catalinaBlue100};
  }

  &:hover {
    cursor: pointer;
    background: ${theme.colors.lavender};
  }

  ${({ count }) =>
    count &&
    css`
      &:after {
        content: "${count}";
        font-size: 12px;
        color: white;
        position: absolute;
        background: ${theme.colors.froly100};
        border-radius: 50%;
        width: 20px;
        height: 20px;
        top: 0;
        right: -10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px 0 1px 0;
      }
    `}
`;

export default DirectMessage;
