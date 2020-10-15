import styled from "styled-components";
import { theme } from "@advisable/donut";

export const CoverImageWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  height: 300px;
  overflow: hidden;
  background-color: ${theme.colors.neutral100};

  @media screen and (max-width: 1024px) {
    & {
      height: 33vw;
    }
  }
  @media screen and (max-width: 640px) {
    & {
      height: 43vw;
    }
  }
`;

export const StyledCoverImage = styled.img`
  border-radius: 12px;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.loaded ? 1 : 0)};
  transition: opacity 400ms;
`;
