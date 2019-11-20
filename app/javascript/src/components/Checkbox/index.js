// DEPRECATED: You should use the checkbox component inside of the donut
// component lib instead.
import React from "react";
import uniqueId from "lodash/uniqueId";
import { Text } from "@advisable/donut";
import { extractSpacingProps } from "src/components/Spacing";
import InputLabel from "src/components/InputLabel";
import InputDescription from "src/components/InputDescription";
import { Wrapper, Input, Box } from "./styles";

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
        {description && <InputDescription>{description}</InputDescription>}
      </InputLabel>
      {error && (
        <Text size="xs" color="red.5" mt="xs">
          {error}
        </Text>
      )}
    </Wrapper>
  );
};

export default Checkbox;
