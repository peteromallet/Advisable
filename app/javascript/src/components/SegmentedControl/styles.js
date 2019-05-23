import { darken, lighten } from "polished";
import styled, { css } from "styled-components";
import colors from "../../colors";

export const SegmentedControlRadio = styled.div`
  user-select: none;

  input {
    width: 1px;
    height: 1px;
    overflow: hidden;
    position: absolute;
    clip: rect(0px, 0px, 0px, 0px);
  }

  label {
    height: 30px;
    padding: 0 12px;
    font-size: 14px;
    cursor: pointer;
    font-weight: 500;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    color: ${colors.neutral.s7};
    background: #f0f2f7;
    transition: background-color 200ms;
  }

  label:hover {
    color: ${colors.neutral.s8};
    background: ${darken(0.02, "#F0F2F7")};
  }

  input:checked + label {
    background: #d1dbff;
    border-color: #d1dbff;
    color: ${darken(0, colors.blue.base)};
  }
`;

export const SegmentedControl = styled.div`
  display: inline-flex;

  ${SegmentedControlRadio}:first-child label {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  ${SegmentedControlRadio}:last-child label {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export default SegmentedControl;
