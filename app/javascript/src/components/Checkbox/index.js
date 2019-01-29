import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { extractSpacingProps } from 'src/components/Spacing';
import InputLabel from "src/components/InputLabel";
import InputDescription from "src/components/InputDescription";
import { Wrapper, Error, Input, Box } from './styles';

const Checkbox = ({ id, error, name, label, onChange, onBlur, value, description, ...props }) => {
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
        {label}
        {description && <InputDescription>{description}</InputDescription>}
      </InputLabel>
      {error && <Error>{error}</Error>}
    </Wrapper>
  )
}

Checkbox.defaultProps = {
  id: uniqueId('Checkbox')
}

export default Checkbox