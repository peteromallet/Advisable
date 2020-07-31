import styled from "styled-components";
import { space, typography } from "styled-system";
import theme from "../../theme";

export const StyledNumberedList = styled.ul`
  ${space}
  ${typography}
`;

export const StyledNumberedListItem = styled.li`
  font-size: 15px;
  line-height: 20px;
  position: relative;
  padding-left: 24px;
  margin-bottom: 12px;
  color: ${theme.colors.neutral700};
  ${space}
`;

export const StyledNumberedListItemNumber = styled.div`
  left: 0;
  top: 50%;
  width: 16px;
  display: flex;
  font-weight: 600;
  position: absolute;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
  color: ${theme.colors.neutral400};
`;
