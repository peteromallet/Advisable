import { space, variant } from "styled-system";
import theme from "../../theme";
import styled from "styled-components";

const color = variant({
  variants: {
    neutral: {
      color: theme.colors.neutral700,
      background: theme.colors.blue100,
    },
    dark: {
      color: theme.colors.white[9],
      background: theme.colors.blue900,
    },
  },
});

const size = variant({
  prop: "size",
  variants: {
    m: {
      fontSize: 13,
      padding: "6px 12px",
    },
  },
});

export const StyledTag = styled.div`
  ${space};
  ${color};
  ${size};

  font-weight: 500;
  border-radius: 20px;
  display: inline-flex;
`;

export default StyledTag;
