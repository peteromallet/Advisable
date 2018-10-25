import styled, { css } from "styled-components";
import disabled from "./disabled.svg";

const DESKTOP_CELL_HEIGHT = 40;

export const Wrapper = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  padding-left: 50px;
  padding-right: 20px;
  border-top: 1px solid #eff0f6;
  border-bottom: 1px solid #eff0f6;
`;

export const HeaderCell = styled.div`
  flex: 1 0 0%;
  padding: 8px 15px;
  border-left: 1px solid #eff0f6;
  opacity: ${props => (props.isSunday || props.isSaturday ? 0.4 : 1)};

  &:last-child {
    border-right: 1px solid #eff0f6;
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

  @media screen and (max-width: 600px) {
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
        h4,
        span {
          display: none;
        }
      `};
  }
`;

export const Times = styled.div`
  display: flex;
  max-height: 40vh;
  overflow-y: scroll;
  padding-left: 50px;
  position: relative;
  padding-right: 20px;
  background: white;
   -webkit-overflow-scrolling: touch;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.06);
`;

export const Hours = styled.div`
  left: 0;
  width: 50px;
  padding-top: 9px;
  position: absolute;
`;

export const Hour = styled.span`
  width: 100%;
  display: block;
  color: #48506e;
  font-size: 11px;
  text-align: right;
  padding-right: 10px;
  height: ${DESKTOP_CELL_HEIGHT}px;

  &:last-child {
    height: auto;
  }
`;

export const Day = styled.div`
  flex: 1 0 0%;
  height: 100%;
  padding-top: 15px;
  position: relative;
  padding-bottom: 15px;
  border-left: 1px solid #dfe2ec;

  @media screen and (max-width: 600px) {
    ${props =>
      props.isSunday &&
      css`
        display: none;
      `};
  }

  &:last-child {
    border-right: 1px solid #dfe2ec;
  }

  &::before {
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 14px;
    position: absolute;
    border-bottom: 1px solid #dfe2ec;
  }

  &::after {
    left: 0;
    bottom: 0;
    content: "";
    width: 100%;
    height: 15px;
    position: absolute;
    border-top: 1px solid #dfe2ec;
  }
`;

export const TimeCell = styled.div`
  padding: 2px;
  position: relative;
  height: ${DESKTOP_CELL_HEIGHT}px;
  border-bottom: 1px solid #DFE2EC;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: transparent;
    svg { opacity: 0; }
  }

  @media screen and (min-width: 600px) {
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

  input {
    width: 0;
    height: 0;
    opacity: 0;
    appearance: none;
    position: absolute;
  }

  input + label {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 8px;

    &:hover {
      background: #eff0f5;
    }
  }

  input:checked + label {
    background: #42e3bd;
  }
`;
