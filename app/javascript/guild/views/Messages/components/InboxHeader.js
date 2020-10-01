import React from "react";
import { css } from "styled-components";
import { theme } from "@advisable/donut";
import { GuildBox } from "@guild/styles";

const InboxHeader = ({ children }) => (
  <GuildBox
    px="l"
    flexSpaceBetween
    alignItems="center"
    background="white"
    minHeight="70px"
    css={css`
      border-width: 0 1px 1px 0;
      box-sizing: border-box;
      border-style: solid;
      border-color: ${theme.colors.ghostWhite};
    `}
  >
    {children}
  </GuildBox>
);

export default InboxHeader;
