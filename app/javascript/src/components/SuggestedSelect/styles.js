import styled, { keyframes } from "styled-components";
import { rgba } from "polished";
import ReactSelect from "react-select";
import colors from "../../colors";

export const Select = styled(ReactSelect)`
  .SuggestedSelect__control {
    border: none;
    padding: 2px 6px;
    font-size: 16px;
    font-weight: 500;
    min-height: 40px;
    border-radius: 8px;
    border: 2px solid transparent;
    background: rgba(29, 39, 75, 0.06);
    transition: border-color 200ms, background-color 300ms;

    &:hover {
      border-color: transparent;
    }

    &.SuggestedSelect__control--is-focused {
      box-shadow: none;
      background: #ecf1fa;
      border-color: #3360ff;
    }
  }

  .SuggestedSelect__placeholder {
    color: #8c92ae;
  }

  .SuggestedSelect__menu {
    z-index: 100;
  }

  .SuggestedSelect__value-container {
    padding: 0;
  }

  .SuggestedSelect__multi-value {
    border-radius: 15px;
    color: rgba(23, 63, 205, 1);
    background: rgba(23, 63, 205, 0.15);

    .SuggestedSelect__multi-value__label {
      padding: 5px;
      color: inherit;
      padding-left: 10px;
    }

    .SuggestedSelect__multi-value__remove {
      opacity: 0.4;
      padding-left: 0;
      padding-right: 8px;

      &:hover {
        opacity: 1;
        color: inherit;
        background-color: transparent;
      }
    }
  }

  .SuggestedSelect__indicator-separator {
    display: none;
  }
`;

const menuAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const MenuContainer = styled.div`
  .SuggestedSelect__menu {
    animation: ${menuAnimation} 300ms;
    box-shadow: 0 30px 60px -30px ${rgba(colors.neutral.s9, 0.2)},
      0 10px 60px ${rgba(colors.neutral.s9, 0.1)},
      0 0 5px ${rgba(colors.neutral.s9, 0.1)};
  }

  .SuggestedSelect__option {
    font-size: 14px;
    font-weight: 500;
    color: ${colors.neutral.s8};
  }

  .SuggestedSelect__option--is-focused {
    color: ${colors.neutral.s10};
    background: ${rgba(colors.blue.base, 0.05)};
  }
`;
