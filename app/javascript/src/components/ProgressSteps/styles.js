import { space } from "styled-system";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

export const StyledProgressSteps = styled.div`
  ${space}

  display: flex;
  flex-direction: column;
`;

const activeStyles = css`
  a {
    color: ${theme.colors.neutral900};
  }

  &:before {
    transform: scale(1.3);
    background: transparent;
    border: 2px solid ${theme.colors.blue500};
  }
`;

const completeStyles = css`
  &:before {
    border-color: transparent;
    background: ${theme.colors.blue500};
  }

  &:after {
    background: ${theme.colors.blue200};
  }

  a {
    color: ${theme.colors.neutral600};
  }

  a:hover {
    color: ${theme.colors.neutral700};
  }
`;

const disabledStyles = css`
  a {
    cursor: default;
    color: ${theme.colors.neutral400};
  }
`;

export const StyledProgressStepsStep = styled.div`
  position: relative;
  padding-left: 20px;
  padding-bottom: 20px;

  &:after {
    top: 10px;
    left: 3px;
    width: 2px;
    z-index: -1;
    content: "";
    position: absolute;
    height: calc(100% - 4px);
    background: ${theme.colors.neutral200};
    transition: background 150ms;
  }

  &:before {
    left: 0;
    top: 4px;
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    transition: transform 250ms;
    background: ${theme.colors.neutral200};
  }

  &:last-child:after {
    display: none;
  }

  a {
    font-size: 16px;
    text-decoration: none;
    letter-spacing: -0.02em;
    color: ${theme.colors.neutral600};
  }

  ${(props) => props.isDisabled && disabledStyles};
  ${(props) => props.isComplete && completeStyles};
  ${(props) => props.isActive && activeStyles};
`;

export default StyledProgressSteps;
