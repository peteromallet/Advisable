import { rgba } from "polished";
import styled, { css } from "styled-components";
import { space, layout } from "styled-system";
import theme from "../../theme";

const ELEVATION = {
  s: css`
    box-shadow: 0 1px 2px ${rgba(theme.colors.neutral[8], 0.1)};
  `,
  m: css`
    box-shadow: 0 5px 10px -5px ${rgba(theme.colors.neutral[8], 0.1)};
  `,
};

export const Card = styled.div`
  ${space}
  ${layout}

  background: white;
  border-radius: 2px;

  ${props => ELEVATION[props.elevation || "m"]};
`;

export default Card;
