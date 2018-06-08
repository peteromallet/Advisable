import React from 'react';
import reduce from 'lodash/reduce';
import { Wrapper } from './styles';

const Avatar = ({ name, url }) => {
  const initials = reduce(name.trim().split(/\s+/), (sum, name) => {
    return `${sum}${name[0]}`
  }, "")

  const style = {
    backgroundImage: `url(${url})`,
  }

  return (
    <Wrapper style={url && style}>
      {!url && initials}
    </Wrapper>
  )
}

export default Avatar
