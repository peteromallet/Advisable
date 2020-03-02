import { space, variant } from "styled-system";
import theme from "../../theme";
import styled from "styled-components";

const color = variant({
  variants: {
    neutral: {
      color: theme.colors.neutral800,
      background: theme.colors.neutral100,
    },
  },
});

const size = variant({
  prop: "size",
  variants: {
    m: {
      fontSize: 14,
      padding: "6px 12px",
    },
  },
});

export const StyledTag = styled.div`
  ${space};
  ${color};
  ${size};

  font-weight: 400;
  border-radius: 20px;
  display: inline-flex;
  letter-spacing: -0.01em;
`;

export default StyledTag;
