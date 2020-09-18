import React from "react";
import { GuildBox } from "@guild/styles";
import GuildTag from "@guild/components/GuildTag";
import styled from "styled-components";
import DownArrow from "@guild/icons/DownArrow";

const ReadMore = ({ onReadMore }) => (
  <StyledReadMore flexCenterBoth>
    <GuildTag alignSelf="flex-end" button size="s" onClick={onReadMore}>
      <DownArrow width={20} height={20} />
    </GuildTag>
  </StyledReadMore>
);

const StyledReadMore = styled(GuildBox)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 40px 0 16px;
  background-image: linear-gradient(to bottom, transparent, white);
`;

export default ReadMore;
