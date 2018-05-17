import React from 'react';
import reduce from 'lodash/reduce';
import { Wrapper } from './styles';

const Avatar = ({ name }) => {
  const initials = reduce(name.split(' '), (sum, name) => {
    return `${sum}${name[0]}`
  }, "")

  return (
    <Wrapper>
      {initials}
    </Wrapper>
  )
}

export default Avatar
