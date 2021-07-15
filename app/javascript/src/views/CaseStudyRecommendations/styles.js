import styled from "styled-components";
import { rgba } from "polished";
import { space, typography } from "styled-system";
import { NavLink, Link } from "react-router-dom";
import { Box, theme } from "@advisable/donut";

export const StyledRecommendationCardAvatar = styled(Box)`
  width: 132px;
  height: 168px;
  border-radius: 16px;
  background: ${theme.colors.neutral200};
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const StyledNavigationItem = styled(NavLink)`
  border: none;
  appearance: none;
  width: 100%;
  height: 40px;
  display: flex;
  padding: 0 12px;
  font-size: 16px;
  border-radius: 12px;
  align-items: center;
  background: transparent;
  font-family: TTHoves, sans-serif;
  color: ${theme.colors.neutral700};

  svg {
    width: 20px;
    margin-right: 8px;
  }

  span {
    flex: 1;
  }

  &:hover {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral50};
  }

  &.active {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral100};
  }
`;

export const StyledNewSearch = styled(StyledNavigationItem)`
  color: ${theme.colors.neutral400};
`;

export const StyledNavigationItemCount = styled.div`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 520;
  color: ${theme.colors.cyan800};
  border-radius: 8px;
  background: ${theme.colors.cyan200};
`;

export const StyledRecommendationTitle = styled(Link)`
  ${space};
  ${typography};
  display: block;
  color: ${theme.colors.neutral900};

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledRecommendationCardActions = styled.div`
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  padding-left: 48px;
  position: absolute;
  align-items: center;
  background: #f8f8f9;
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
    background: linear-gradient(90deg, ${rgba("#F8F8F9", 0)} 0%, #f8f8f9 100%);
  }
`;

export const StyledRecommendation = styled(Box)`
  position: relative;

  .subtitle {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &:hover {
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
