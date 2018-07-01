import React from "react";
import uniqueID from "lodash/uniqueId";
import { Wrapper, Input } from "./styles";
import InputError from "src/components/InputError";
import InputLabel from "src/components/InputLabel";

const TextField = ({
  type = "text",
  id,
  name,
  value,
  block = false,
  onChange,
  onBlur,
  label,
  error,
  placeholder,
  mask
}) => {
  const fieldID = id || uniqueID("TextField");

  return (
    <Wrapper block={block}>
      {label && <InputLabel htmlFor={fieldID}>{label}</InputLabel>}
      <Input
        type={type}
        mask={mask}
        id={fieldID}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
        placeholder={placeholder}
      />
      {error && <InputError>{error}</InputError>}
    </Wrapper>
  );
};

export default TextField;
