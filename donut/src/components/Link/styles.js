import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { space, typography } from "styled-system";
import theme from "../../theme";

const VARIANTS = {
  default: css`
    color: ${theme.colors.blue[6]};

    &:hover {
      color: ${theme.colors.blue[8]};
    }
  `,
  subtle: css`
    color: ${theme.colors.neutral[7]};

    &:hover {
      color: ${theme.colors.blue[6]};
    }
  `,
};

// There is some funky stuff going on with the new release of react-router-dom
// not playing nicely with styled-components as prop. Because of this we have
// added a .External sub component to use non react router links.
const styles = css`
  ${space}
  ${typography}

  align-items: center;
  display: inline-flex;
  text-decoration: none;
  transition: color 200ms;
  ${props => VARIANTS[props.variant || "default"]};
`;

export const LinkStyles = styled(Link)`
  ${styles}
`;

LinkStyles.External = styled.a`
  ${styles}
`;

export default LinkStyles;
