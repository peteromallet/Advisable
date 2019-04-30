import { rgba } from "polished";
import styled from "styled-components";
import colors from "../../colors";

export const Wrapper = styled.div`
  .DayPicker-wrapper {
    padding: 0;
    outline: none;
  }

  .DayPicker-NavBar {
    button {
      width: 30px;
      height: 30px;
      border: none;
      outline: none;
      font-size: 14px;
      font-weight: 500;
      appearance: none;
      position: absolute;
      border-radius: 6px;
      color: ${colors.neutral.s7};
      background: ${rgba(colors.neutral.s2, 0.5)};

      &:hover {
        color: ${colors.blue.base};
        background: ${rgba(colors.neutral.s2, 0.7)};
      }
    }

    button:first-child {
      left: 0;
    }

    button:last-child {
      right: 0;
    }
  }

  .DayPicker-Month {
    margin: 0;

    .DayPicker-Caption > div {
      font-size: 16px;
    }
  }

  .DayPicker-Caption {
    text-align: center;
    padding-top: 6px;
    padding-bottom: 10px;
  }

  .DayPicker-Weekday {
    height: 25px;
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    color: ${colors.neutral.s7};
  }

  .DayPicker-Day {
    padding: 0;
    width: 38px;
    height: 38px;
    color: #1e1a48;
    font-size: 12px;
    font-weight: 500;
    border-radius: 0;
    color: ${colors.neutral.s9};
    border-top: 1px solid ${colors.neutral.s1};
    border-left: 1px solid ${colors.neutral.s1};
    transition: background-color 100ms;

    &:focus {
      outline: none;
      color: ${colors.neutral.s10};
      background-color: ${colors.neutral.s1};

    }

    &:not(.DayPicker-Day--selected):not(.DayPicker-Day--disabled):hover {
      color: ${colors.neutral.s10};
      background-color: ${colors.neutral.s1};
    }

    &.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
      font-weight: 700;
      background: ${colors.blue.base};
    }
  }

  .DayPicker-Week {
    .DayPicker-Day:last-child {
      border-right: 1px solid ${colors.neutral.s1};
    }

    &:last-child .DayPicker-Day {
      border-bottom: 1px solid ${colors.neutral.s1};
    }
  }

  .DayPicker-Day--disabled {
    opacity: 0.2;
  }

  .DayPicker-Day--outside:not(.DayPicker-Day--disabled) {
    opacity: 0.5;
  }
`;
