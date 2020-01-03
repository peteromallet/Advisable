import styled from "styled-components";
import { space } from "styled-system";
import theme from "../../theme";
import StyledText from "../Text/styles";

export const StyledNotice = styled.div`
  ${space}

  display: flex;
  border-radius: 12px;
  align-items: center;
  background: ${theme.colors.orange[1]};
`;

export const StyledNoticeIcon = styled.div`
  display: flex;
  margin-right: 16px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.orange[5]};
`;

export const StyledNoticeHeader = styled(StyledText)``;

export const StyledNoticeContent = styled(StyledText)``;

export default StyledNotice;
