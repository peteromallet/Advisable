import React from "react";
import uniqueID from "lodash/uniqueId";
import { Wrapper, Input } from "./styles";
import InputLabel from 'src/components/InputLabel';

const TextField = ({ type = "text", id, label, placeholder, mask }) => {
  const fieldID = id || uniqueID("TextField");

  return (
    <Wrapper>
      {label && <InputLabel htmlFor={fieldID}>{label}</InputLabel>}
      <Input
        type={type}
        mask={mask}
        id={fieldID}
        autoComplete="off"
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

export default TextField;
