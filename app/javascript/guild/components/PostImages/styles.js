import styled, { createGlobalStyle } from "styled-components";
import { theme, Box } from "@advisable/donut";

export const ImageModalOverrides = createGlobalStyle`
 .image-gallery {
    button.image-gallery-icon {
      &:hover {
        color: ${theme.colors.catalinaBlue100};
      }
    }

    .image-gallery-slide img {
      max-height: 70vh !important;
      object-fit: cover;
      overflow: hidden;
      object-position: center center;
    }

    .fullscreen .image-gallery-slide img {
      max-height: 100vh;
    }
 }
`;

export const ImagesButton = styled(Box)`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0.7;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid white;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  cursor: pointer;
  margin: 16px;

  &:hover {
    opacity: 1;
    transition: opacity 200ms;
  }

  svg {
    fill: white;
  }
`;
