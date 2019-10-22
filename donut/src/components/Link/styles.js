import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { space } from "styled-system";
import theme from "../../theme";

// There is some funky stuff going on with the new release of react-router-dom
// not playing nicely with styled-components as prop. Because of this we have
// added a .External sub component to use non react router links.
const styles = css`
  ${space};

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

export const LinkStyles = styled(Link)`
  ${styles}
`;

LinkStyles.External = styled.a`
  ${styles}
`;

export default LinkStyles;
