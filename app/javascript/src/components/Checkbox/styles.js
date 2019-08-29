import styled from "styled-components";
import InputLabel from "src/components/InputLabel";
import InputDescription from "src/components/InputDescription";
import { withSpacing } from "src/components/Spacing";
import { theme } from "@advisable/donut";
import tick from "./tick.svg";

export const Wrapper = withSpacing(styled.div`
  ${InputLabel} {
    user-select: none;
    position: relative;
    padding-left: 28px;
    padding-bottom: 0;
  }

  ${InputDescription} {
    padding-top: 2px;
  }
`);

export const Box = styled.span`
  left: 0;
  top: 50%;
  width: 18px;
  height: 18px;
  display: block;
  border-radius: 4px;
  position: absolute;
  transform: translateY(-50%);
  transition: border-color 200ms;
  border: 2px solid ${theme.colors.neutral[2]};
`;

export const Input = styled.input`
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);

  &:checked + ${InputLabel} ${Box} {
    border-color: ${theme.colors.blue[5]};
    background: url(${tick}) no-repeat center;
  }
`;

export const Error = styled.span`
  display: block;
  color: #ff0073;
  font-size: 14px;
  padding-top: 6px;
  padding-left: 28px;
`;
