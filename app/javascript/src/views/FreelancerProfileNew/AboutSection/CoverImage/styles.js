import { rgba } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";

export const CoverImageWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  height: 300px;
  background-color: ${theme.colors.neutral100};
`;

export const StyledCoverImage = styled.img`
  border-radius: 12px;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.loaded ? 1 : 0)};
  transition: opacity 400ms;
`;

export const FileUploader = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  overflow: hidden;
  position: absolute;
  bottom: 12px;
  right: 12px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral700};
  background: ${rgba(theme.colors.neutral100, 0.5)};
  transition: background 0.2s, color 0.2s, opacity 0.2s;
  opacity: 0;

  &:hover {
    color: ${theme.colors.neutral800};
    background: ${rgba(theme.colors.neutral100, 0.7)};
  }
  ${CoverImageWrapper}:hover & {
    opacity: 1;
  }

  input {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
  }
`;
