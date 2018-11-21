import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { extractSpacingProps } from 'src/components/Spacing';
import { Wrapper, Error, Input, Label, Box } from './styles';

const Checkbox = ({ id, error, name, label, onChange, onBlur, value, ...props }) => {
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
      <Label htmlFor={id}>
        <Box />
        {label}
      </Label>
      {error && <Error>{error}</Error>}
    </Wrapper>
  )
}

Checkbox.defaultProps = {
  id: uniqueId('Checkbox')
}

export default Checkbox