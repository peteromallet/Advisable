import { rgba } from "polished";
import styled, { css } from "styled-components";
import { Box, theme } from "@advisable/donut";

export const StyledProfileImageWrapper = styled.div`
  height: 360px;
  overflow: hidden;
  position: relative;
  background: ${theme.colors.neutral400};
  border-radius: 12px;
  box-shadow: 0 8px 20px ${rgba(theme.colors.neutral900, 0.2)};
`;

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
  opacity: 0;
  position: absolute;
  background-size: cover;
  transition: opacity 0.7s;
  background-position: center;
  background-color: ${theme.colors.neutral200};

  ${props =>
    props.loaded &&
    css`
      opacity: 1;
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
    ${rgba(theme.colors.blue900, 0)},
    ${rgba(theme.colors.blue900, 0.75)}
  );
`;

export const StyledImageContent = styled.div`
  z-index: 3;
  left: 20px;
  bottom: 20px;
  position: absolute;
`;
