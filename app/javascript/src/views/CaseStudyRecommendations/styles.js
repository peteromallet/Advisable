import styled from "styled-components";
import { Box, theme } from "@advisable/donut";

export const StyledRecommendationCardAvatar = styled(Box)`
  width: 120px;
  height: 140px;
  border-radius: 16px;
  background: ${theme.colors.neutral200};
  background-size: cover;
  background-position: center;
`;

export const StyledRecommendationCardActions = styled.div`
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  padding: 0 48px;
  position: absolute;
  align-items: center;
  border-radius: 16px;
  background: white;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms;

  &::before {
    content: "";
    width: 80px;
    height: 100%;
    position: absolute;
    top: 0;
    left: -80px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  }
`;

export const StyledRecommendationCard = styled(Box)`
  cursor: pointer;
  background: white;
  position: relative;
  transition: box-shadow 200ms;
  box-shadow: 0px 4px 8px rgba(56, 56, 56, 0.04),
    0px 16px 40px rgba(0, 0, 0, 0.04);

  .subtitle {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &:hover {
    box-shadow: 0px 8px 16px rgba(56, 56, 56, 0.08),
      0px 16px 60px rgba(0, 0, 0, 0.08);

    .title {
      text-decoration: underline;
    }

    ${StyledRecommendationCardActions} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

export const StyledSearchCard = styled.div`
  padding: 24px;
  height: 400px;
  cursor: pointer;
  background: white;
  position: relative;
  border-radius: 12px;
  transition: box-shadow 200ms;
  box-shadow: 0px 4px 8px rgba(56, 56, 56, 0.04),
    0px 16px 40px rgba(0, 0, 0, 0.04);

  &:hover {
    box-shadow: 0px 8px 16px rgba(56, 56, 56, 0.08),
      0px 16px 60px rgba(0, 0, 0, 0.08);
  }
`;

export const StyledNewSearchButton = styled(StyledSearchCard)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 100%;
  transition: box-shadow 200ms, background 200ms;
  box-shadow: 0px 0px 0px rgba(56, 56, 56, 0.04),
    0px 0px 0px rgba(0, 0, 0, 0.04);
  border: 2px solid white;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
