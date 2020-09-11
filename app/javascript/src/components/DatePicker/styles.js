import { rgba } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";

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
      color: ${theme.colors.neutral700};
      background: ${rgba(theme.colors.neutral200, 0.5)};

      &:hover {
        color: ${theme.colors.blue500};
        background: ${rgba(theme.colors.neutral200, 0.7)};
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
    color: ${theme.colors.neutral700};
  }

  .DayPicker-Day {
    padding: 0;
    width: 38px;
    height: 38px;
    color: #1e1a48;
    font-size: 12px;
    font-weight: 500;
    border-radius: 0;
    color: ${theme.colors.neutral900};
    border-top: 1px solid ${theme.colors.neutral100};
    border-left: 1px solid ${theme.colors.neutral100};
    transition: background-color 100ms;

    &:focus {
      outline: none;
      color: ${theme.colors.neutral900};
      background-color: ${theme.colors.neutral100};
    }

    &:not(.DayPicker-Day--selected):not(.DayPicker-Day--disabled):hover {
      color: ${theme.colors.neutral900};
      background-color: ${theme.colors.neutral100};
    }

    &.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
      font-weight: 700;
      background: ${theme.colors.blue500};
    }
  }

  .DayPicker-Week {
    .DayPicker-Day:last-child {
      border-right: 1px solid ${theme.colors.neutral100};
    }

    &:last-child .DayPicker-Day {
      border-bottom: 1px solid ${theme.colors.neutral100};
    }
  }

  .DayPicker-Day--disabled {
    opacity: 0.2;
  }

  .DayPicker-Day--outside:not(.DayPicker-Day--disabled) {
    opacity: 0.5;
  }
`;
