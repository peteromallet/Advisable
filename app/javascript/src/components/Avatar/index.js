import React from 'react';
import reduce from 'lodash/reduce';
import { Wrapper } from './styles';

const Avatar = ({ name, url, size, ...props }) => {
  const initials = reduce(name.trim().split(/\s+/), (sum, name) => {
    return `${sum}${name[0]}`
  }, "")

  const style = {
    backgroundImage: `url(${url})`,
  }

  return (
    <Wrapper style={url && style} size={size} {...props}>
      {!url && initials}
    </Wrapper>
  )
}

export default Avatar
