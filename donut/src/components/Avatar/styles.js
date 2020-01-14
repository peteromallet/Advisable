import styled from "styled-components";
import { space, border, variant } from "styled-system";
import theme from "../../theme";

const size = variant({
  prop: "size",
  variants: {
    xs: {
      width: 20,
      height: 20,
    },
    s: {
      width: 40,
      height: 40,
    },
    m: {
      width: 60,
      height: 60,
    },
    l: {
      width: 80,
      height: 80,
    },
  },
});

export const StyledAvatar = styled.div`
  ${size}
  ${space}
  ${border}

  border-radius: 50%;
  position: relative;
  background-color: ${theme.colors.neutral[1]};
`;

export const StyledAvatarInitials = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 18px;
  font-weight: 500;
  position: absolute;
  align-items: center;
  display: inline-flex;
  letter-spacing: -0.02em;
  justify-content: center;
  color: ${theme.colors.neutral[4]};
`;

export const StyledAvatarImage = styled.div.attrs(props => ({
  style: {
    backgroundImage: props.url && `url(${props.url})`,
  },
}))`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  position: absolute;
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.url ? 1 : 0)};
  transition: opacity 500ms;
`;

export default StyledAvatar;
