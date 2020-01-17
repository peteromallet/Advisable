import styled from "styled-components";
import { space } from "styled-system";
import theme from "../../theme";

export const StyledAvailability = styled.div`
  ${space}
`;

export const StyledAvailabilityScrollContainer = styled.div`
  &::-moz-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledAvailabilityDay = styled.div`
  width: 50px;
  display: flex;
  padding-top: 16px;
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
  height: ${props => (props.hasAvailability ? "90px" : "70px")};
  background: ${props =>
    props.hasAvailability ? theme.colors.blue[1] : theme.colors.neutral[1]};
`;

export default StyledAvailability;
