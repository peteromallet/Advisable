import styled from "styled-components";
import { Link } from "react-router-dom";
import { space } from "styled-system";
import theme from "../../theme";

export const LinkStyles = styled(Link)`
  ${space}

  display: inline-block;
  text-decoration: none;
  color: ${theme.colors.blue[5]};

  &:hover {
    text-decoration: underline;
    color: ${theme.colors.blue[6]};
  }
`;

export default LinkStyles;
