import { rgba } from "polished";
import styled, { css } from "styled-components";
import { Box, theme } from "@advisable/donut";

export const StyledProfileImageWrapper = styled.div`
  height: 360px;
  overflow: hidden;
  position: relative;
  background: ${theme.colors.neutral100};

  @media screen and (min-width: 52em) {
    border-radius: 12px;
    box-shadow: 0 8px 20px ${rgba(theme.colors.neutral800, 0.2)};
  }
`;

export const StyledProfileImage = styled(Box).attrs((props) => ({
  style: {
    backgroundImage: `url(${props.url})`,
  },
}))`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  position: absolute;
  transform: scale(1.1);
  background-size: cover;
  background-position: center top;
  transition: opacity 0.7s, transform 6s;
  background-color: ${theme.colors.neutral200};

  @media screen and (min-width: 52em) {
    background-position: center;
  }

  ${(props) =>
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
    ${rgba(theme.colors.neutral900, 0)},
    ${rgba(theme.colors.blue900, 0.5)}
  );
`;

export const StyledImageContent = styled.div`
  z-index: 3;
  left: 20px;
  bottom: 20px;
  position: absolute;
`;
