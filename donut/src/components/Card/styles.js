import { rgba } from "polished";
import styled, { css } from "styled-components";
import { compose, space, layout, border } from "styled-system";
import theme from "../../theme";

export const ELEVATION = {
  s: css`
    box-shadow: 0 1px 2px ${rgba(theme.colors.neutral[8], 0.1)};
  `,
  m: css`
    box-shadow: 0 5px 10px -5px ${rgba(theme.colors.neutral[8], 0.1)};
  `,
  l: css`
    box-shadow: 0px 20px 80px rgba(26, 35, 67, 0.12);
  `,
};

export const Card = styled.div`
  ${compose(
    space,
    layout,
    border
  )}

  background: white;
  border-radius: 2px;

  ${props => ELEVATION[props.elevation || "m"]};
`;

export default Card;
