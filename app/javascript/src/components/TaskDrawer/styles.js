import { rgba } from "polished";
import styled, { css, keyframes } from "styled-components";
import colors from "../../colors";
import { Status } from "../Status/styles";
import { Menu } from "../Menu/styles";
import { Icon } from "../Icon/styles";
import { theme } from "@advisable/donut";

const placeholderColor = color => css`
  &::-webkit-input-placeholder {
    color: ${color};
  }
  &::-moz-placeholder {
    color: ${color};
  }
  &:-ms-input-placeholder {
    color: ${color};
  }
  &:-moz-placeholder {
    color: ${color};
  }
`;

export const TaskDrawer = styled.div`
  height: 100%;
  padding-top: 60px;
  position: relative;

  ${Status} {
    top: 25px;
    left: 20px;
    position: absolute;
  }

  ${Menu} {
    top: 20px;
    right: 50px;
    position: absolute;
  }
`;

export const Title = styled.textarea`
  width: 100%;
  padding: 8px;
  border: none;
  resize: none;
  height: auto;
  outline: none;
  overflow: auto;
  font-size: 21px;
  font-weight: 500;
  line-height: 24px;
  border-radius: 6px;
  margin-bottom: 8px;
  letter-spacing: -0.035rem;
  font-family: poppins, sans-serif;
  color: ${theme.colors.neutral[9]};
  border: 2px solid transparent;
  transition: border-color 200ms;

  &:not([readonly]) {
    &:hover {
      background: ${theme.colors.neutral[0]};
    }

    &:focus {
      background: ${theme.colors.neutral[0]};
      border: 2px solid ${colors.blue.base};
    }
  }

  ${placeholderColor(theme.colors.neutral[3])}
`;

export const TaskDetails = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  margin: 0 8px 0 8px;
  border-top: 1px solid ${theme.colors.neutral[1]};
  border-bottom: 1px solid ${theme.colors.neutral[1]};
`;

export const Detail = styled.button`
  padding: 8px;
  border: none;
  text-align: left;
  appearance: none;
  margin-left: -8px;
  padding-left: 55px;
  padding-right: 12px;
  position: relative;
  margin-right: 60px;
  border-radius: 12px;
  line-height: 18px;
  background: transparent;

  @media (max-width: 900px) {
    margin-right: 15px;
  }

  &:focus {
    outline: none;
  }

  ${props =>
    !props.readOnly &&
    css`
      &:hover {
        cursor: pointer;
        background: ${theme.colors.neutral[0]};
      }
    `}
`;

export const Popout = styled.div`
  z-index: 1;
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 60px ${rgba(colors.neutral.s9, 0.25)},
    0 2px 8px ${rgba(colors.neutral.s9, 0.1)};
`;

const promptAnimation = keyframes`
  from {
    opacity: 0.5;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(1.3);
  }
`;

export const DetailIcon = styled.div`
  top: 50%;
  left: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  user-select: none;
  position: absolute;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.blue[5]};
  background: ${theme.colors.blue[1]};
  transform: translateY(-50%);

  ${Icon} {
    display: flex;
  }

  ${props =>
    props.prompt &&
    css`
      &::before {
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        border: 1px solid ${colors.blue.base};
        animation: ${promptAnimation} 2s infinite;
      }
    `}
`;

export const DetailLabel = styled.h5`
  line-height: 1;
  font-size: 12px;
  font-weight: 400;
  color: ${theme.colors.neutral[4]};
`;

export const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.neutral[8]};

  @media (max-width: 900px) {
    font-size: 13px;
  }
`;

export const DetailPlaceholder = styled(DetailValue)`
  font-weight: 400;
  color: ${theme.colors.neutral[3]};
`;

export const Label = styled.label`
  color: #0a163f;
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
  margin: 0 8px 4px 8px;
`;

export const Description = styled.textarea`
  width: 100%;
  padding: 8px;
  border: none;
  resize: none;
  outline: none;
  overflow: auto;
  color: #0a163f;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  border-radius: 6px;
  background: transparent;
  border: 2px solid transparent;
  font-family: poppins, sans-serif;
  transition: border-color 200ms;
  ${placeholderColor(theme.colors.neutral[4])}

  &:not([readonly]) {
    &:hover {
      background: ${theme.colors.neutral[0]};
    }

    &:focus {
      background: ${theme.colors.neutral[0]};
      border: 2px solid ${colors.blue.base};
    }
  }
`;

export const Confirmation = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: ${rgba("#FFFFFF", 0.75)};
`;

export const ConfirmationContainer = styled.div`
  padding: 30px;
  max-width: 400px;
  background: white;
  border-radius: 8px;
  position: absolute;
  text-align: center;
  box-shadow: 0 8px 60px ${rgba(colors.neutral.s8, 0.2)},
    0 2px 6px ${rgba(colors.neutral.s8, 0.15)};
`;

export const ArrowPrompt = styled.div`
  left: 14px;
  bottom: -30px;
  position: absolute;
  color: ${colors.blue.base};
`;

export const StageDescription = styled.div`
  z-index: 0;
  font-size: 14px;
  line-height: 18px;
  border-radius: 6px;
  position: relative;
  padding: 12px 8px 12px 48px;
  color: ${colors.neutral.s8};
  background: ${colors.neutral.s1};

  ${Icon} {
    top: 50%;
    left: 16px;
    position: absolute;
    transform: translateY(-50%);
    color: ${colors.blue.base};
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
`;

export const SavingIndicator = styled.div`
  right: 20px;
  z-index: 9;
  bottom: 20px;
  padding: 6px 8px;
  position: fixed;
  display: flex;
  font-size: 12px;
  font-weight: 500;
  align-items: center;
  border-radius: 6px;
  justify-content: center;
  color: ${theme.colors.blue[7]};
  background-color: ${theme.colors.blue[1]};
  transition: opacity 200ms, transform 300ms;

  opacity: 0;
  transform: translateX(100%);

  svg {
    margin-right: 4px;
    animation: ${spin} 500ms infinite linear;
  }

  ${props =>
    props.isSaving &&
    css`
      opacity: 1;
      transform: translateX(0);
      transition: opacity 200ms, transform 300ms;
    `}
`;
