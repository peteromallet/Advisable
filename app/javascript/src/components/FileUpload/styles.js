import { rgba } from "polished";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

export const FileUploadStyles = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
`;

export const FileUploader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  padding-left: 12px;
  border-radius: 12px;
  align-items: center;
  background: ${rgba(theme.colors.neutral100, 0.7)};

  &:hover {
    background: ${rgba(theme.colors.neutral100, 0.8)};
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
    cursor: pointer;
    position: absolute;
  }
`;

export const MainText = styled.span`
  display: block;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${theme.colors.neutral800};
  transition: color 300ms, transform 300ms;
`;

export const SubText = styled.span`
  display: block;
  font-size: 13px;
  font-weight: 400;
  color: ${theme.colors.neutral500};
  transition: color 300ms, transform 300ms;
`;

export const Preview = styled.div`
  z-index: 1;
  margin-right: 12px;
`;

export const Info = styled.div`
  z-index: 1;
  transform: translateY(-1px);
  ${(props) => props.uploading && InfoUploadingStyles}
`;

const InfoUploadingStyles = css`
  ${MainText} {
    transform: translateY(10px);
    color: ${theme.colors.neutral700};
  }

  ${SubText} {
    opacity: 0;
    transform: translateY(12px);
  }
`;

export const ProgressBar = styled.div.attrs((props) => ({
  style: {
    width: `${props.percentage}%`,
  },
}))`
  top: 0;
  left: 0;
  width: 20%;
  z-index: 0;
  height: 100%;
  position: absolute;
  transition: width 100ms;
  background: ${theme.colors.neutral200};
`;
