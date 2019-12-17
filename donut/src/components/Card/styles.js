import { rgba } from "polished";
import styled, { css } from "styled-components";
import { compose, space, layout, border, variant } from "styled-system";
import theme from "../../theme";

const elevation = variant({
  prop: "elevation",
  variants: {
    none: {
      boxShadow: "none",
    },
    s: {
      boxShadow: `0 1px 2px ${rgba(theme.colors.neutral[8], 0.1)};`,
    },
    m: {
      boxShadow: `0 5px 10px -5px ${rgba(theme.colors.neutral[8], 0.1)};`,
    },
    l: {
      boxShadow: `0px 20px 80px rgba(26, 35, 67, 0.12);`,
    },
  },
});

export const Card = styled.div`
  ${compose(space, layout, border, elevation)}

  outline: none;
  background: white;
  border-radius: 2px;
`;

export default Card;
