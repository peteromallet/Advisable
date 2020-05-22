import { rgba } from "polished";
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
    width: 24px;
    height: 24px;
    stroke-width: 2;
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
      borderTop: `3px solid ${theme.colors.orange400}`,
      boxShadow: `0 1px 2px ${rgba(theme.colors.orange900, 0.18)}`,
      [StyledNoticeIcon]: {
        color: theme.colors.orange700,
      },
    },
    neutral: {
      background: theme.colors.neutral50,
      borderTop: `3px solid ${theme.colors.neutral500}`,
      boxShadow: `0 1px 2px ${rgba(theme.colors.neutral900, 0.18)}`,
      [StyledNoticeIcon]: {
        color: theme.colors.neutral600,
      },
    },
    cyan: {
      background: theme.colors.cyan50,
      borderTop: `3px solid ${theme.colors.cyan600}`,
      boxShadow: `0 1px 2px ${rgba(theme.colors.cyan900, 0.24)}`,
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
  border-radius: 2px;
  align-items: flex-start;
`;

export default StyledNotice;
