import styled, { css } from "styled-components";
import { GuildBox } from "@guild/styles";
import { theme } from "@advisable/donut";
import { rgba } from "polished";

export const ComposerBoxOption = styled(GuildBox)`
  height: 135px;
  width: 135px;
  background-color: #f5f6fb;
  padding: 14px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid transparent;
  box-sizing: border-box;

  svg {
    fill: ${theme.colors.blue900};
  }

  :hover {
    opacity: 0.8;
  }

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid ${theme.colors.catalinaBlue100};
    `}
`;

export const StyledTopicable = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  background: ${theme.colors.neutral100};
  padding: 8px;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  color: #2b2d5f;
  border: none;
  outline: none;
  font-size: 16px;

  &:hover {
    cursor: ${(props) => (props.selectable ? "pointer" : "default")};
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    color: #a2a3c0;
  }
`;

const withoutCoverStyles = css`
  border: 2px dashed ${theme.colors.neutral100};
  &:hover {
    border-color: ${theme.colors.neutral300};
    .title {
      color: ${theme.colors.blue600};
    }
  }
`;

const withCoverStyles = css`
  background-image: url("${(p) => p.coverImage}");
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
  background-color: ${theme.colors.neutral50};
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
