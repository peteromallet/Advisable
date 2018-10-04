import styled, { keyframes } from "styled-components";

const calendarIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Wrapper = styled.div`
  .DayPickerInput {
    display: block;
  }

  .DayPickerInput-Overlay {
    left: 0;
    width: 100%;
    min-width: 260px;
    max-width: 320px;
    border-radius: 5px;
    box-shadow: 0px 5px 50px rgba(30, 26, 72, 0.25);
    animation: ${calendarIn} 300ms cubic-bezier(0.2, 0, 0, 1);
  }

  .DayPicker-wrapper {
    padding: 20px;
    outline: none;
  }

  .DayPicker-NavBar {
    button {
      width: 30px;
      height: 30px;
      border: none;
      outline: none;
      color: #173fcd;
      font-size: 15px;
      font-weight: 500;
      background: white;
      appearance: none;
      position: absolute;
      border-radius: 50%;
      box-shadow: 0px 1px 5px rgba(30, 26, 72, 0.25);
    }

    button:first-child {
      left: 25px;
    }

    button:last-child {
      right: 25px;
    }
  }

  .DayPicker-Month {
    margin: 0;
  }

  .DayPicker-Caption {
    text-align: center;
    padding-top: 6px;
    padding-bottom: 10px;
  }

  .DayPicker-Weekday {
    font-size: 11px;
    font-weight: 500;
    height: 25px;
    text-transform: uppercase;
  }

  .DayPicker-Day {
    padding: 0;
    width: 40px;
    height: 40px;
    color: #1e1a48;
    font-size: 14px;
    font-weight: 500;
  }

  .DayPicker-Day--disabled {
    opacity: 0.2;
  }

  .DayPicker-Day--outside:not(.DayPicker-Day--disabled) {
    opacity: 0.5;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    font-weight: 600;
    background-color: #173fcd;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 36px;
  border: none;
  outline: none;
  padding: 0 12px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: #f4f7fc;
  letter-spacing: -0.03em;
  transition: background 300ms;

  &::-webkit-inner-spin-button {
    opacity: 0;
    -webkit-appearance: none;
  }

  &:focus {
    background: #ecf1fa;
  }

  &::-webkit-input-placeholder {
    color: #a4add1;
  }
  &::-moz-placeholder {
    color: #a4add1;
  }
  &:-ms-input-placeholder {
    color: #a4add1;
  }
  &:-moz-placeholder {
    color: #a4add1;
  }
`;
