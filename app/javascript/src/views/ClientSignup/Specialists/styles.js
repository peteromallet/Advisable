import styled from "styled-components";
import { StyledCard } from "@advisable/donut";

export const StyledPriceRange = styled.div`
  padding: 60px 40px;
  position: relative;
  text-align: center;
`;

export const StyledPriceRangeBackground = styled(StyledCard)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  position: absolute;
`;
