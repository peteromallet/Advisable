import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { extractSpacingProps } from 'src/components/Spacing';
import { Wrapper, Input, Label, Box } from './styles';

const Checkbox = ({ id, label, onChange, value, ...props }) => {
  return (
    <Wrapper {...extractSpacingProps(props)}>
      <Input
        id={id}
        type="checkbox"
        onChange={onChange}
        checked={value}
      />
      <Label htmlFor={id}>
        <Box />
        {label}
      </Label>
    </Wrapper>
  )
}

Checkbox.defaultProps = {
  id: uniqueId('Checkbox')
}

export default Checkbox