import { rgba } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";

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
    pointer-events: none;
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

export const NavButton = styled.button`
  top: 50%;
  appearance: none;
  width: 50px;
  height: 50px;
  border: none;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  position: absolute;
  z-index: 10;
  transform: translateY(-50%) scale(1);
  color: ${theme.colors.blue[6]};
  box-shadow: 0 4px 16px ${rgba(theme.colors.neutral[9], 0.2)};
  transition: transform 200ms cubic-bezier(0.25, 0, 0, 1), box-shadow 200ms;

  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 28px ${rgba(theme.colors.neutral[9], 0.25)};
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

export const StyledSideScrollerInner = styled.div`
  --count: ${props => props.count};
  display: grid;
  grid-gap: 20px;
  padding: 40px 0;
  overflow-x: scroll;
  grid-template-rows: minmax(150px, 1fr);
  grid-template-columns:
    60px
    repeat(var(--count), calc(25% - 55px))
    60px;

  &::-moz-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1300px) {
    grid-template-columns:
      40px
      repeat(var(--count), calc(33.33333% - 70px))
      60px;
  }

  @media (max-width: 1000px) {
    grid-template-columns:
      40px
      repeat(var(--count), calc(50% - 95px))
      60px;
  }

  @media (max-width: 800px) {
    grid-template-columns:
      10px
      repeat(var(--count), calc(100% - 170px))
      20px;
  }

  &:before,
  &:after {
    content: "";
  }
`;

export const StyledSideScrollerItem = styled.div`
  /* scroll-snap-align: start; */
  /* flex: 0 0 auto;
  border-top-style: solid;
  border-top-color: transparent;

  &:last-child {
    padding-right: 100px;
  } */
`;
