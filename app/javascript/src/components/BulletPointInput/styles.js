import styled from "styled-components";
import { margin } from "styled-system";
import {
  StyledInput,
  StyledTextarea,
  StyledTextareaControl,
} from "@advisable/donut";

export const StyledBulletPointInput = styled(StyledInput).attrs((props) => ({
  as: "div",
}))`
  ${margin};
  padding: 0px 24px;
  display: block;
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
    border-color: transparent;
  }

  ${StyledTextarea} {
    margin: 0;
    outline: none;
    padding: 0 0;

    &:focus {
      background: transparent;
      border-color: transparent;
    }
  }
`;
