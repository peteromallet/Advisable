import styled from "styled-components";
import { margin } from "styled-system";
import {
  StyledInput,
  StyledTextarea,
  StyledTextareaControl,
} from "@advisable/donut";

export const StyledBulletPointInput = styled(StyledInput).attrs(() => ({
  as: "div",
}))`
  ${margin};
  display: block;
  padding: 8px 24px;
`;

export const StyledBulletPointInputItem = styled.div`
  width: 100%;
  padding-left: 20px;
  position: relative;

  &::before {
    content: "";
    left: 0;
    top: 50%;
    width: 8px;
    height: 8px;
    position: absolute;
    border-radius: 50%;
    background: #323646;
    transform: translateY(-50%);
  }

  ${StyledTextareaControl} {
    padding: 8px 0;
    border-color: transparent;
  }

  ${StyledTextarea} {
    margin: 0;
    outline: none;

    &:focus {
      background: transparent;
      border-color: transparent;
    }
  }
`;
