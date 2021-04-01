import React, { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import DATA from "./data";
import { theme, Box, StyledInput, StyledInputControl } from "@advisable/donut";
import isoToEmoji from "./countryEmoji";

const StyledPhonNumberInput = styled(StyledInput)`
  ${StyledInputControl} {
    padding-left: 4px;
  }
`;

const StyledSelect = styled.select`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
`;

const StyledCountryPrompt = styled.div`
  height: 100%;
  display: flex;
  font-size: 20px;
  position: relative;
  padding-right: 12px;
  align-items: center;
  padding-left: 12px;

  &::after {
    content: "";

    width: 0;
    height: 0;
    margin-left: 8px;
    border-top: 4px solid ${theme.colors.neutral500};
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }
`;

const StyledDialCode = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

function Countries({ disabled, country, ...props }) {
  return (
    <Box position="relative">
      <StyledCountryPrompt>{isoToEmoji(country.id)}</StyledCountryPrompt>
      <StyledSelect
        {...props}
        disabled={disabled}
        tabIndex={-1}
        value={country.id}
        prefix={isoToEmoji("US")}
      >
        {Object.values(DATA).map((country) => (
          <option key={country.id} value={country.id}>
            {country.label} ({country.dialCode})
          </option>
        ))}
      </StyledSelect>
    </Box>
  );
}

function initCountryByDialCode(phoneNumber) {
  const country = Object.values(DATA).find((country) => {
    return phoneNumber?.includes(country.dialCode);
  });

  return country?.id || "US";
}

export default function PhoneNumberInput({
  size = "md",
  onFocus = () => {},
  onBlur = () => {},
  value,
  onChange,
  initialCountry = "US",
  ...props
}) {
  const input = useRef(null);
  const [country, setCountry] = useState(
    value ? initCountryByDialCode(value) : initialCountry,
  );
  const [focused, setFocused] = useState(false);
  const countryData = useMemo(() => DATA[country], [country]);

  const valueWithoutCode = useMemo(() => {
    return value?.replace(countryData.dialCode, "") || "";
  }, [value, countryData.dialCode]);

  const handleFocus = useCallback(
    (e) => {
      setFocused(true);
      onFocus(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e) => {
      setFocused(false);
      onBlur(e);
    },
    [onBlur],
  );

  const submitValue = useCallback(
    (code, number) => {
      if (number) {
        onChange(`${code}${number}`);
      } else {
        onChange("");
      }
    },
    [onChange],
  );

  const handleSelectCountry = useCallback(
    (e) => {
      setCountry(e.target.value);
      const code = DATA[e.target.value].dialCode;
      submitValue(code, valueWithoutCode);
      input.current.focus();
    },
    [submitValue, valueWithoutCode],
  );

  const handleChange = useCallback(
    (e) => {
      submitValue(countryData.dialCode, e.target.value);
    },
    [submitValue, countryData.dialCode],
  );

  return (
    <StyledPhonNumberInput
      data-focused={focused}
      size={size}
      $error={props.error}
      $disabled={props.disabled}
    >
      <Countries
        disabled={props.disabled}
        country={countryData}
        onChange={handleSelectCountry}
      />
      <StyledDialCode>{countryData.dialCode}</StyledDialCode>
      <StyledInputControl
        {...props}
        ref={input}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        value={valueWithoutCode}
      />
    </StyledPhonNumberInput>
  );
}
