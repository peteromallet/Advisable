import { rgba } from "polished";
import styled, { css, keyframes } from "styled-components";
import { Status } from "../Status/styles";
import { theme } from "@advisable/donut";

const placeholderColor = (color) => css`
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
  position: relative;

  ${Status} {
    top: 25px;
    left: 20px;
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
  color: ${theme.colors.neutral900};
  border: 2px solid transparent;
  transition: border-color 200ms;

  &:not([readonly]) {
    &:hover {
      background: ${theme.colors.neutral100};
    }

    &:focus {
      background: ${theme.colors.neutral100};
      border: 2px solid ${theme.colors.blue500};
    }
  }

  ${placeholderColor(theme.colors.neutral400)}
`;

export const TaskDetails = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  margin: 0 8px 0 8px;
  border-top: 1px solid ${theme.colors.neutral100};
  border-bottom: 1px solid ${theme.colors.neutral100};
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

  ${(props) =>
    !props.readOnly &&
    css`
      &:hover {
        cursor: pointer;
        background: ${theme.colors.neutral100};
      }
    `}
`;

export const Popout = styled.div`
  z-index: 1;
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 60px ${rgba(theme.colors.neutral900, 0.25)},
    0 2px 8px ${rgba(theme.colors.neutral900, 0.1)};
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
  color: ${theme.colors.blue600};
  background: ${theme.colors.blue200};
  transform: translateY(-50%);

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 1.8;
  }

  ${(props) =>
    props.prompt &&
    css`
      &::before {
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        border: 1px solid ${theme.colors.blue500};
        animation: ${promptAnimation} 2s infinite;
      }
    `}
`;

export const DetailLabel = styled.h5`
  line-height: 1;
  font-size: 12px;
  font-weight: 400;
  color: ${theme.colors.neutral500};
`;

export const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.neutral800};

  @media (max-width: 900px) {
    font-size: 13px;
  }
`;

export const DetailPlaceholder = styled(DetailValue)`
  font-weight: 400;
  color: ${theme.colors.neutral400};
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
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  border-radius: 6px;
  background: transparent;
  border: 2px solid transparent;
  font-family: poppins, sans-serif;
  transition: border-color 200ms;
  ${placeholderColor(theme.colors.neutral500)}

  &:not([readonly]) {
    &:hover {
      background: ${theme.colors.neutral100};
    }

    &:focus {
      background: ${theme.colors.neutral100};
      border: 2px solid ${theme.colors.blue500};
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
  box-shadow: 0 8px 60px ${rgba(theme.colors.neutral800, 0.2)},
    0 2px 6px ${rgba(theme.colors.neutral800, 0.15)};
`;

export const ArrowPrompt = styled.div`
  left: 14px;
  bottom: -30px;
  position: absolute;
  color: ${theme.colors.blue500};
`;

export const StageDescription = styled.div`
  z-index: 0;
  font-size: 14px;
  line-height: 18px;
  border-radius: 6px;
  position: relative;
  padding: 12px 8px 12px 48px;
  color: ${theme.colors.neutral800};
  background: ${theme.colors.neutral100};

  svg {
    top: 50%;
    left: 16px;
    width: 24px;
    height: 24px;
    stroke-width: 2;
    position: absolute;
    transform: translateY(-50%);
    color: ${theme.colors.blue500};
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
  color: ${theme.colors.blue800};
  background-color: ${theme.colors.blue100};

  svg {
    margin-right: 4px;
    animation: ${spin} 500ms infinite linear;
  }
`;
