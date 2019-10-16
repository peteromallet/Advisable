import { rgba } from "polished";
import styled from "styled-components";

export const StyledSideScroller = styled.div`
  z-index: 0;
  position: relative;

  &::before,
  &::after {
    top: 0;
    content: "";
    height: 100%;
    width: 100px;
    position: absolute;
  }

  &::before {
    left: 0;
    background: linear-gradient(90deg, #f4f6fd, ${rgba("#F4F6FD", 0)});
  }

  &::after {
    right: 0;
    background: linear-gradient(90deg, ${rgba("#F4F6FD", 0)}, #f4f6fd);
  }
`;

export const StyledSideScrollerInner = styled.div`
  height: 100%;
  display: flex;
  overflow-x: auto;
  margin-top: 0px;
  min-width: 100vw;
  max-width: 100vw;
  padding-left: 0px;
  margin-bottom: 0px;
  overflow-y: hidden;
  padding-left: 60px;
  /* scroll-padding: 60px; */
  padding-top: 30px;
  padding-bottom: 40px;
  /* scroll-snap-type: x mandatory; */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledSideScrollerItem = styled.div`
  /* scroll-snap-align: start; */
  border-top-style: solid;
  border-top-color: transparent;

  &:last-child {
    padding-right: 60px;
  }
`;
