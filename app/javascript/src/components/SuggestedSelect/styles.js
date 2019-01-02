import styled from "styled-components";
import { darken } from 'polished';
import ReactSelect from "react-select";

export const Select = styled(ReactSelect)`
  .SuggestedSelect__control {
    height: 40px;
    border: none;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    background: #f4f7fc;
    padding: 0 6px;
    border: 2px solid transparent;
    transition: border-color 200ms, background-color 300ms;

    &:hover {
      border-color: ${darken(0.05, "#f4f7fc")};
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
`;
