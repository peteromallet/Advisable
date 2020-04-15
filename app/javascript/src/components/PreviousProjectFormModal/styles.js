import { rgba } from "polished";
import styled, { css, keyframes } from "styled-components";
import { theme } from "@advisable/donut";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledDialog = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  position: fixed;
  background: white;
  padding-top: 60px;
  animation: ${slideUp} 500ms forwards;
`;

export const StyledDialogContent = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

export const StyledPreviousProjectFormHeader = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0 20px;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 6px ${rgba(theme.colors.neutral800, 0.2)};
`;

export const StyledClosePreviousProjectFormButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  appearance: none;
  align-items: center;
  display: inline-flex;
  background: transparent;
  color: ${theme.colors.blue600};
  font-family: "Poppins", sans-serif;

  &:hover {
    color: ${theme.colors.blue700};
  }
`;

const withoutCoverStyles = css`
  background-color: ${theme.colors.neutral50};
  border: 2px dashed ${theme.colors.neutral100};

  &:hover {
    border-color: ${theme.colors.neutral300};

    .title {
      color: ${theme.colors.blue600};
    }
  }
`;

const withCoverStyles = css`
  background-image: url(${(p) => p.coverImage});
`;

export const StyledCoverPhoto = styled.div`
  height: 300px;
  margin-bottom: 12px;
  position: relative;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  ${(p) => (p.coverImage ? withCoverStyles : withoutCoverStyles)};

  input {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

export const StyledCoverPhotoTag = styled.div`
  top: 8px;
  left: 8px;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 6px 3px 6px;
  border-radius: 6px;
  position: absolute;
  text-transform: uppercase;
  background: ${rgba(theme.colors.neutral900, 0.9)};
`;
