import React from "react";
import uniqueId from "lodash/uniqueId";
import { extractSpacingProps } from "src/components/Spacing";
import InputLabel from "src/components/InputLabel";
import InputDescription from "src/components/InputDescription";
import { Wrapper, Error, Input, Box } from "./styles";

const Checkbox = ({
  error,
  name,
  label,
  onChange,
  onBlur,
  value,
  description,
  children,
  ...props
}) => {
  const [id, _] = React.useState(props.id || uniqueId("Checkbox"));

  return (
    <Wrapper {...extractSpacingProps(props)}>
      <Input
        id={id}
        name={name}
        type="checkbox"
        onChange={onChange}
        onBlur={onBlur}
        checked={value}
      />
      <InputLabel htmlFor={id}>
        <Box />
        {label || children}
      </InputLabel>
      {description && <InputDescription>{description}</InputDescription>}
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

export default Checkbox;
