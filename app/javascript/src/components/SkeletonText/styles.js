import styled, { keyframes } from "styled-components";
import { withSpacing } from "../Spacing";

const animation = keyframes`
  from {
    opacity: 0.05;
  }

  to {
    opacity: 0.1;
  }
`

export const SkeletonTextLine = styled.div`
  height: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #3C466A;

  &:last-child:not(:first-child) {
    width: 80%;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const SkeletonTextContainer = withSpacing(styled.div`
  animation: ${animation} 0.6s linear infinite alternate;
`)