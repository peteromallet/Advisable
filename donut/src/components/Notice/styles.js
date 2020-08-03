import styled from "styled-components";
import { space, variant } from "styled-system";
import theme from "../../theme";
import StyledText from "../Text/styles";

export const StyledNoticeIcon = styled.div`
  display: flex;
  margin-right: 12px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  margin-top: -2px;
  color: ${theme.colors.neutral500};

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
    margin-top: 2px;
  }
`;

export const StyledNoticeHeader = styled(StyledText)`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${theme.colors.neutral900};
`;

export const StyledNoticeContent = styled(StyledText)`
  font-size: 15px;
  line-height: 1.3em;
  color: ${theme.colors.neutral700};
`;

const noticeTypes = variant({
  variants: {
    orange: {
      background: theme.colors.orange50,
      [StyledNoticeIcon]: {
        color: theme.colors.orange700,
      },
    },
    neutral: {
      background: "#eff0f3",
      [StyledNoticeIcon]: {
        color: theme.colors.neutral600,
      },
    },
    cyan: {
      background: theme.colors.cyan50,
      [StyledNoticeIcon]: {
        color: theme.colors.cyan700,
      },
    },
  },
});

export const StyledNotice = styled.div`
  ${space}
  ${noticeTypes}

  display: flex;
  padding: 18px;
  border-radius: 12px;
  align-items: flex-start;
`;

export default StyledNotice;
