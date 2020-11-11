import React, { useRef } from "react";
import { theme } from "@advisable/donut";
import styled from "styled-components";

const LINE_HEIGHT = 34;

export const StyledPostTitleInput = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  font-size: 36px;
  overflow: hidden;
  color: ${theme.colors.neutral900};
  line-height: ${LINE_HEIGHT}px;
  font-weight: 500;
  letter-spacing: -0.04rem;
  font-family: "TT Hoves", sans-serif;

  &::placeholder {
    color: ${theme.colors.neutral400};
  }
`;

export default function PostTitle(props) {
  const textarea = useRef(null);

  function calculateRows() {
    textarea.current.rows = 1;
    const baseHeight = textarea.current.scrollHeight;
    const currentRows = Math.floor(baseHeight / LINE_HEIGHT);
    textarea.current.rows = currentRows;
  }

  React.useLayoutEffect(calculateRows, [props.value]);

  return <StyledPostTitleInput ref={textarea} {...props} />;
}
