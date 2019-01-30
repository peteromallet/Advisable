import styled from "styled-components";
import { darken } from 'polished';
import ReactSelect from "react-select";

export const Select = styled(ReactSelect)`
  .SuggestedSelect__control {
    height: 40px;
    border: none;
    padding: 0 6px;
    font-size: 16px;
    font-weight: 500;
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
    color: #8C92AE;
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
`;
