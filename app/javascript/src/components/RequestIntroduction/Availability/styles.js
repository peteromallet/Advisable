import styled from "styled-components";

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
  opacity: ${props => props.isWeekend ? 0.4 : 1};

  &:last-child {
    border-right: 1px solid #eff0f6;
  }

  h4 {
    color: #1D2749;
    font-size: 14px;
    font-weight: 600;
  }

  span {
    color: #8992B1;
    font-size: 12px;
    font-weight: 500;
  }
`;

export const Times = styled.div`
  display: flex;
  max-height: 40vh;
  overflow-y: scroll;
  padding-left: 50px;
  position: relative;
  padding-right: 20px;
  background: #F9FBFF;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.06);
`;

export const Hours = styled.div`
  left: 0;
  width: 50px;
  padding-top: 9px;
  position: absolute;
`

export const Hour = styled.span`
  width: 100%;
  display: block;
  color: #48506E;
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
  border-left: 1px solid #eff0f6;

  &:last-child {
    border-right: 1px solid #eff0f6;
  }

  &::before {
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 15px;
    position: absolute;
    border-bottom: 1px solid #eff0f6;
  }

  &::after {
    left: 0;
    bottom: 0;
    content: '';
    width: 100%;
    height: 15px;
    position: absolute;
    border-top: 1px solid #eff0f6;
  }
`;

export const TimeCell = styled.div`
  padding: 2px;
  position: relative;
  height: ${DESKTOP_CELL_HEIGHT}px;
  border-bottom: 1px solid #eff0f6;

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
