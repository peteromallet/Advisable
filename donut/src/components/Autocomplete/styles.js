import { rgba } from "polished";
import { space } from "styled-system";
import styled, { css } from "styled-components";
import Text from "../Text/styles";
import FieldError from "../FieldError/styles";
import colors from "../../colors";
import theme from "../../theme";

export const Label = styled(Text)`
  display: block;
  margin-bottom: 8px;
`;

export const Autocomplete = styled.div`
  ${space}
  position: relative;

  ${FieldError} {
    margin-top: 8px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 38px;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0 12px;
  font-weight: 500;
  border-radius: 8px;
  background: ${theme.colors.neutral[1]};

  &::placeholder {
    color: ${theme.colors.neutral[4]};
  }
`;

export const StyledMenuContainer = styled.div`
  &[data-placement="bottom"] {
    padding-top: 8px;
  }
`;

export const Menu = styled.div`
  width: 100%;
  background: white;
  border-radius: 2px;
  max-height: 224px;
  overflow: hidden;
  top: calc(100% + 8px);
  box-shadow: 0 2px 8px ${rgba(theme.colors.neutral[9], 0.1)},
    0 16px 60px ${rgba(theme.colors.neutral[9], 0.15)};
`;

const highlightedItemStyles = css`
  color: ${theme.colors.neutral[9]};
  background: ${theme.colors.neutral[0]};
`;

export const MenuItem = styled.div`
  height: 36px;
  display: flex;
  cursor: pointer;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 400;
  align-items: center;
  letter-spacing: -0.015em;
  color: ${theme.colors.neutral[8]};

  ${(props) => props.highlighted && highlightedItemStyles};

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &[disabled] {
    opacity: 0.5;
  }

  svg {
    margin-right: 8px;
  }
`;

export const MobileContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: white;
`;

export const MobileContainerTop = styled.div`
  height: 50px;
  display: flex;
  padding: 0 4px;
  align-items: center;
  box-shadow: 0 2px 4px ${rgba(colors.neutral.N9, 0.1)};
`;

export const MobileContainerBack = styled.button`
  width: 38px;
  height: 38px;
  border: none;
  flex-grow: 0;
  outline: none;
  flex-shrink: 0;
  margin-right: 8px;
  appearance: none;
`;

export const MobileContainerSearch = styled.div`
  flex-grow: 1;
`;

export const Tags = styled.div`
  display: block;
`;

export const TagName = styled.div`
  padding: 0 8px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    padding-left: 16px;
  }
`;

export const Primary = styled.button`
  padding: 0;
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 4px;
  appearance: none;
  background: white;
  border-radius: 50%;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  color: ${theme.colors.neutral[3]};

  &:hover {
    color: ${theme.colors.neutral[4]};
  }

  ${(props) =>
    props.isPrimary &&
    css`
      color: ${theme.colors.blue[5]} !important;
    `}
`;

export const RemoveTag = styled.button`
  padding: 0;
  width: 36px;
  height: 100%;
  border: none;
  outline: none;
  appearance: none;
  padding-right: 2px;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: ${rgba(theme.colors.blue900, 0.4)};
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  background: ${rgba(theme.colors.blue100, 0.8)};
  transition: opacity 150ms;

  &:hover {
    color: ${theme.colors.blue900};
  }
`;

export const Tag = styled.div`
  height: 32px;
  margin-top: 8px;
  margin-right: 8px;
  align-items: center;
  border-radius: 16px;
  display: inline-flex;
  color: ${theme.colors.blue800};
  background: ${theme.colors.blue50};
  transition: background-color 300ms;
  ${(props) => props.onClick && StyledClickableTag}
  ${(props) => props.isPrimary && StyledPrimaryTag}
`;

const StyledClickableTag = css`
  cursor: pointer;

  &:hover ${Primary} {
    color: ${theme.colors.neutral[4]};
  }
`;

const StyledPrimaryTag = css`
  color: white;
  background: ${theme.colors.blue900};

  ${RemoveTag} {
    color: white;
    background: rgba(255, 255, 255, 0.3);
  }
`;

export default Autocomplete;
