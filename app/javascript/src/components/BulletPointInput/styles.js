import styled from "styled-components";
import { margin } from "styled-system";
import { StyledInput, StyledTextarea } from "@advisable/donut";

export const StyledBulletPointInput = styled(StyledInput).attrs((props) => ({
  as: "div",
}))`
  ${margin};
  padding: 12px 24px;
`;

export const StyledBulletPointInputItem = styled.div`
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

  ${StyledTextarea} {
    margin: 0;
    outline: none;
    padding: 4px 0;

    &:focus {
      background: transparent;
      border-color: transparent;
    }
  }
`;
