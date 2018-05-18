import React from "react";
import { Select, Wrapper, Arrows } from "./styles.js";

export default ({ name, options, value, placeholder, onChange, onFocus, onBlur }) => {
  // Placeholder value is an empty string
  const PLACEHOLDER_VALUE = ''

  const isPlaceholder = Boolean(!value && placeholder);
  const placeholderMarkup = isPlaceholder && (
    <option value={PLACEHOLDER_VALUE} disabled selected>
      {placeholder}
    </option>
  );

  const optionsMarkup = options.map(option => {
    if (typeof option === "string") {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    } else {
      return (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      );
    }
  });

  // When there is no onChange, React will complain about providing a `value`
  // (and vice versa for `defaultValue`)
  const defaultValue = onChange ? undefined : value || PLACEHOLDER_VALUE;
  const finalValue = onChange ? value || PLACEHOLDER_VALUE : undefined;

  return (
    <Wrapper>
      <Select
        name={name}
        value={finalValue}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {placeholderMarkup}
        {optionsMarkup}
      </Select>
      <Arrows />
    </Wrapper>
  );
};
