import React from "react";
import uniqueID from "lodash/uniqueId";
import { Select, Wrapper, SelectWrapper, Arrows } from "./styles.js";
import InputLabel from "src/components/InputLabel";

export default ({
  name,
  options,
  id,
  block,
  label,
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur
}) => {
  const fieldID = id || uniqueID("TextField");

  // Placeholder value is an empty string
  const PLACEHOLDER_VALUE = "";

  const isPlaceholder = Boolean(!value && placeholder);
  const placeholderMarkup = isPlaceholder && (
    <option value={PLACEHOLDER_VALUE} disabled>
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
          disabled={option.disabled}>
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
    <Wrapper block={block}>
      {label && <InputLabel htmlFor={fieldID}>{label}</InputLabel>}
      <SelectWrapper block={block}>
        <Select
          name={name}
          value={finalValue}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}>
          {placeholderMarkup}
          {optionsMarkup}
        </Select>
        <Arrows />
      </SelectWrapper>
    </Wrapper>
  );
};
