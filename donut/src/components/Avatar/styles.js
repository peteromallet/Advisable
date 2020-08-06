import styled from "styled-components";
import { color, space, border, variant } from "styled-system";

const size = variant({
  prop: "size",
  variants: {
    xxs: {
      width: 20,
      height: 20,
    },
    xs: {
      width: 30,
      height: 30,
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
    xl: {
      width: 120,
      height: 120,
    },
  },
});

export const StyledAvatar = styled.div`
  ${size}
  ${space}
  ${border}
  ${color}

  border-radius: 50%;
  position: relative;
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
  color: inherit;
`;

export const StyledAvatarImage = styled.div.attrs((props) => ({
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
  opacity: ${(props) => (props.url ? 1 : 0)};
  transition: opacity 500ms;
`;

export default StyledAvatar;
