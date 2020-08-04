import React from "react";
import ReactPhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styled from "styled-components";
import { Input } from "@advisable/donut";
import theme from "../../../../donut/src/theme";

const StyledPhoneInput = styled(ReactPhoneInput)`
  .PhoneInputInput {
    flex: 1;
    margin: 0;
    border: none;
    height: 48px;
    outline: none;
    font-size: 16px;
    box-sizing: border-box;
    background: transparent;
    padding-top: 1px;
    padding-bottom: 1px;
    border-radius: 0px;
    color: ${theme.colors.neutra900};
    font-family: system-ui, poppins, sans-serif;
    border: 2px solid transparent;
    transition: border-color 200ms;
  }
`;

function PhoneInput(props) {
  return <Input as={StyledPhoneInput} international {...props} />;
}

export default PhoneInput;
