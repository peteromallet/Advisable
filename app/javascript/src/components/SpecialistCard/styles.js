import styled from "styled-components";
import { StyledCard, theme } from "@advisable/donut";

export const StyledSpecialistName = styled.h4`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
  letter-spacing: -0.03em;
  transition: color 300ms;
  color: ${theme.colors.blue[8]};
`;

export const StyledSpecialistCard = styled(StyledCard)`
  position: relative;
`;

export default StyledSpecialistCard;
