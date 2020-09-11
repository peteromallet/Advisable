import styled from "styled-components";
import { space } from "styled-system";
import theme from "../../theme";

export const StyledError = styled.div`
  ${space}

  font-size: 15px;
  padding: 6px 8px;
  border-radius: 8px;
  color: ${theme.colors.red800};
  background: ${theme.colors.red100};
`;

export default StyledError;
