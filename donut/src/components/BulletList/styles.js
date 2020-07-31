import styled from "styled-components";
import { space, typography } from "styled-system";
import theme from "../../theme";

export const StyledBulletList = styled.ul`
  ${space}
  ${typography}
`;

export const StyledBulletListItem = styled.li`
  font-size: 16px;
  line-height: 20px;
  position: relative;
  padding-left: 24px;
  margin-bottom: 12px;
  color: ${theme.colors.neutral700};
  ${space}

  &::before {
    top: 6px;
    left: 0;
    width: 8px;
    height: 8px;
    content: "";
    border-radius: 50%;
    position: absolute;
    background: ${theme.colors.neutral200};
  }
`;
