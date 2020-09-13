import React from "react";
import styled from "styled-components";
import { Box } from "@advisable/donut";

const StyledIndustryTag = styled(Box)`
  height: 24px;
  font-size: 12px;
  padding: 0 12px;
  font-weight: 500;
  align-items: center;
  border-radius: 16px;
  display: inline-flex;
`;

function IndustryTag({ industry, ...props }) {
  const color = industry.color || "blue";

  return (
    <StyledIndustryTag bg={`${color}100`} color={`${color}800`} {...props}>
      {industry.name}
    </StyledIndustryTag>
  );
}

export default IndustryTag;
