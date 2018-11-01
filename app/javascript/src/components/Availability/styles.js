import styled, { css } from "styled-components";
import disabled from "./disabled.svg";

const DESKTOP_CELL_HEIGHT = 40;
const MOBILE_CELL_HEIGHT = 50;
const BREAKPOINT = 800;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  padding-left: 40px;
  padding-right: 40px;
  border-top: 1px solid #eff0f6;
  border-bottom: 1px solid #eff0f6;
`;

export const HeaderCell = styled.div`
  flex: 1 0 0%;
  height: 45px;
  padding: 8px 15px;
  border-left: 1px solid #eff0f6;

  &:last-child {
    box-shadow: inset -1px 0 0 0 #eff0f6;
  }

  h4 {
    color: #1d2749;
    font-size: 14px;
    font-weight: 600;
  }

  span {
    color: #8992b1;
    font-size: 12px;
    font-weight: 500;
  }

  ${props =>
    (props.isSunday || props.isSaturday) &&
    css`
      h4,
      span {
        opacity: 0.5;
      }
    `} @media screen and (max-width: ${BREAKPOINT}px) {
    padding-left: 0;
    padding-right: 0;
    text-align: center;

    h4 {
      font-size: 13px;
    }
    span {
      font-size: 10px;
    }

    ${props =>
      props.isSunday &&
      css`
        display: none;
      `} ${props =>
  props.isSaturday &&
  css`
    width: 10px;
    flex: none;

    h4,
    span {
      display: none;
    }
  `};
  }
`;

export const NavButton = styled.button`
  top: 0;
  padding: 0;
  width: 40px;
  height: 45px;
  border: none;
  outline: none;
  appearance: none;
  border-radius: 4px;
  position: absolute;

  &:disabled {
    opacity: 0.25;
  }

  ${props =>
    props.previous &&
    css`
      left: 0px;
    `} ${props =>
    props.next &&
    css`
      right: 0px;
    `};
`;

export const Times = styled.div`
  height: 0;
  display: flex;
  flex: 1 1 auto;
  overflow-y: scroll;
  padding-left: 40px;
  padding-right: 40px;
  position: relative;
  -webkit-overflow-scrolling: touch;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08);
`;

export const Hours = styled.div`
  left: 0;
  width: 40px;
  padding-top: 9px;
  position: absolute;
`;

export const Hour = styled.span`
  width: 100%;
  display: block;
  color: #48506e;
  font-size: 10px;
  text-align: right;
  padding-right: 5px;
  height: ${DESKTOP_CELL_HEIGHT}px;

  @media screen and (max-width: ${BREAKPOINT}px) {
    height: ${MOBILE_CELL_HEIGHT}px;
  }

  &:last-child {
    height: auto;
  }
`;

export const TimeCell = styled.div`
  padding: 2px;
  position: relative;
  touch-action: none;
  height: ${DESKTOP_CELL_HEIGHT}px;
  border-bottom: 1px solid #DFE2EC;
  border-left: 1px solid #dfe2ec;

@media screen and (min-width: ${BREAKPOINT}px) {
  &:first-child {
    border-top: 1px solid #dfe2ec;
  }
}

  @media screen and (max-width: ${BREAKPOINT}px) {
    padding: 2px;
    border-left: none;
    border-bottom: none;
    height: ${MOBILE_CELL_HEIGHT}px;
  }

  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: transparent;
    svg { opacity: 0; }

    @media screen and (max-width: ${BREAKPOINT}px) {
      border-radius: 6px;
      background: #EFF0F5;
    }
  }

  @media screen and (min-width: ${BREAKPOINT}px) {
    &:hover div {
      background: #EFF0F5;
    }
  }

  ${props =>
    props.isSelected &&
    css`
      div {
        background: #42e3bd;
        svg {
          opacity: 1;
        }
      }

      &:hover div {
        background: #2ed9b0;
      }
    `}

    ${props =>
      props.isHighlighted &&
      css`
        div,
        &:hover div {
          background: #eff0f5;
          svg {
            opacity: 0;
          }
        }
      `}

  ${props =>
    props.disabled &&
    css`
      background: #fafafb;
      background-image: url(${disabled});
    `}

`;

export const Day = styled.div`
  flex: 1 0 0%;
  height: 100%;
  padding-top: 15px;
  position: relative;
  padding-bottom: 15px;

  @media screen and (min-width: ${BREAKPOINT}px) {
    &:last-child ${TimeCell} {
      border-right: 1px solid #dfe2ec;
    }
  }

  @media screen and (max-width: ${BREAKPOINT}px) {
    ${props =>
      props.isSunday &&
      css`
        display: none;
      `};

    ${props =>
      props.isSaturday &&
      css`
        width: 10px;
        flex: none;

        @media screen and (max-width: ${BREAKPOINT}px) {
          margin: 2px;
        }
      `};
  }
`;
