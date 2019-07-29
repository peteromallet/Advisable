import { space } from "styled-system";
import styled, { css } from "styled-components";
import { darken, lighten, rgba } from "polished";
import colors from "../../colors";
import Icon from "../Icon/styles";

const APPEARANCES = {
  default: css`
    height: 36px;
    line-height: 1;
    padding: 0 16px;
    background: ${rgba(colors.neutral.N2, 0.7)};

    &:hover:not(:disabled) {
      background: ${rgba(colors.neutral.N2, 1)};
    }

    &:active:not(:disabled) {
      background: ${rgba(colors.neutral.N2, 0.6)};
    }
  `,
  primary: css`
    height: 36px;
    line-height: 1;
    padding: 0 16px;
    font-weight: 600;
  `,
  minimal: css`
    outline: none;
    font-weight: 500;
    padding: 2px 8px;
    margin-left: -8px;
    background: transparent;
  `,
  outline: css``,
};

const INTENT = {
  default: {
    default: css`
      color: ${colors.neutral.N6};

      &:hover:not(:disabled) {
        color: ${colors.neutral.N8};
      }

      &:active:not(:disabled) {
        color: ${colors.neutral.N5};
      }
    `,
    success: css`
      color: ${colors.blue.N6};

      &:hover:not(:disabled) {
        color: ${colors.blue.N7};
      }

      &:active:not(:disabled) {
        color: ${colors.blue.N4};
      }
    `,
  },
  primary: {
    default: css`
      color: white;
      background: ${colors.neutral.N6};
    `,
    success: css`
      color: white;
      background: ${colors.blue.N5};

      &:hover:not(:disabled) {
        background: ${darken(0.1, colors.blue.N5)};
      }

      &:active:not(:disabled) {
        background: ${lighten(0.1, colors.blue.N5)};
      }
    `,
  },
  minimal: {
    success: css`
      color: ${colors.blue.N5};

      &:hover:not(:disabled) {
        color: ${colors.blue.N6};
      }

      &:active:not(:disabled) {
        color: ${colors.blue.N4};
      }
    `,
  },
  outline: {
    default: css``,
  },
};

const disabledStyling = css`
  opacity: 0.5;
  cursor: default;
`;

export const Button = styled.button`
  margin: 0;
  border: none;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  font-weight: 600;
  border-radius: 8px;
  align-items: center;
  display: inline-flex;
  text-decoration: none;
  justify-content: center;
  width: ${props => props.width};

  ${space}

  ${props => props.disabled && disabledStyling};

  ${Icon} {
    margin-right: 8px;
  }

  ${props => APPEARANCES[props.appearance]};
  ${props => INTENT[props.appearance][props.intent]};
`;

export default Button;
