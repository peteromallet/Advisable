import styled from "styled-components";
import { Link } from "react-router-dom";
import { space } from "styled-system";
import theme from "../../theme";

export const LinkStyles = styled(Link)`
  ${space}

  font-weight: 400;
  align-items: center;
  display: inline-flex;
  text-decoration: none;
  transition: color 200ms;
  color: ${theme.colors.blue[6]};

  &:hover {
    color: ${theme.colors.blue[8]};
  }
`;

export default LinkStyles;
