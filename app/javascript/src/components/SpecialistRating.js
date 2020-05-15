import React from "react";
import styled from "styled-components";
import { Box } from "@advisable/donut";
import { Star } from "@styled-icons/feather";

const StyledSpecialistRating = styled(Box)`
  color: white;
  display: flex;
  height: 26px;
  width: 58px;
  z-index: 2px;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  border-radius: 15px;
  font-weight: 600;
  background: #feb700;
  font-size: 13px;
  svg {
    margin-right: 4px;
  }
`;

const SpecialistRating = ({ children, ...props }) => {
  return (
    <StyledSpecialistRating {...props}>
      <Star size={14} fill="white" />
      {Number(children)?.toFixed(1)}
    </StyledSpecialistRating>
  );
};

export default SpecialistRating;
