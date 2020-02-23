import { rgba } from "polished";
import styled, { css } from "styled-components";
import { Box, theme } from "@advisable/donut";

export const StyledProfileImage = styled(Box).attrs(props => ({
  style: {
    backgroundImage: `url(${props.url})`,
  },
}))`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  position: absolute;
  background-size: cover;
  background-position: center;
  transition: opacity 0.7s, transform 6s;
  background-color: ${theme.colors.neutral[2]};
  opacity: 0;
  transform: scale(1.1);

  ${props =>
    props.loaded &&
    css`
      opacity: 1;
      transform: scale(1);
    `}
`;

export const StyledImageGradient = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  content: "";
  position: absolute;
  background: linear-gradient(
    ${rgba(theme.colors.neutral[9], 0)},
    ${rgba(theme.colors.blue[9], 0.5)}
  );
`;

export const StyledImageContent = styled.div`
  z-index: 3;
  left: 20px;
  bottom: 20px;
  position: absolute;
`;
