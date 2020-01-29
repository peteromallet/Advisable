import styled from "styled-components";
import { space } from "styled-system";
import theme from "../../theme";

export const StyledError = styled.div`
  ${space}

  font-size: 15px;
  padding: 6px 8px;
  border-radius: 8px;
  color: ${theme.colors.red[7]};
  background: ${theme.colors.red[0]};
`;

export default StyledError;
