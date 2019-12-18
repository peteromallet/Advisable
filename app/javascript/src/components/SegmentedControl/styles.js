import { rgba, darken } from "polished";
import styled from "styled-components";
import { space } from "styled-system";
import { theme } from "@advisable/donut";

export const SegmentedControlRadio = styled.div`
  width: 100%;
  margin: 3px;
  user-select: none;

  input {
    width: 1px;
    height: 1px;
    overflow: hidden;
    position: absolute;
    clip: rect(0px, 0px, 0px, 0px);
  }

  label {
    width: 100%;
    height: 100%;
    padding: 0 12px;
    font-size: 14px;
    cursor: pointer;
    font-weight: 500;
    border-radius: 8px;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    letter-spacing: -0.01em;
    color: ${theme.colors.neutral[7]};
    transition: background-color 200ms;
  }

  label:hover {
    color: ${theme.colors.neutral[8]};
    background: ${darken(0.02, theme.colors.neutral[1])};
  }

  input:checked + label {
    background: white;
    color: ${theme.colors.blue[5]};
    box-shadow: 0 2px 4px ${rgba(theme.colors.neutral[8], 0.1)},
      0 1px 3px ${rgba(theme.colors.neutral[8], 0.1)};
  }
`;

export const SegmentedControl = styled.div`
  ${space}
  width: 100%;
  height: 36px;
  display: flex;
  border-radius: 8px;
  background: ${theme.colors.neutral[1]};

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
