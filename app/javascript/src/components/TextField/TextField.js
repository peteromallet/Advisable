import React from "react";
import uniqueID from "lodash/uniqueId";
import { Wrapper, Input, Textarea } from "./styles";
import InputError from "src/components/InputError";
import InputLabel from "src/components/InputLabel";

const TextField = ({
  type = "text",
  id,
  name,
  value,
  multiline,
  block = false,
  onChange,
  onBlur,
  label,
  error,
  placeholder,
  mask
}) => {
  const fieldID = id || uniqueID("TextField");

  const Component = multiline ? Textarea : Input;

  return (
    <Wrapper block={block}>
      {label && <InputLabel htmlFor={fieldID}>{label}</InputLabel>}
      <Component
        type={type}
        mask={mask}
        id={fieldID}
        name={name}
        value={value}
        onBlur={onBlur}
        autoComplete="off"
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <InputError>{error}</InputError>}
    </Wrapper>
  );
};

export default TextField;
