import React from 'react';
import reduce from 'lodash/reduce';
import { Avatar } from './styles';

const Component = ({ name, url, size, ...props }) => {
  const initials = reduce(name.trim().split(/\s+/), (sum, name) => {
    return `${sum}${name[0]}`
  }, "")

  const style = {
    backgroundImage: `url(${url})`,
  }

  return (
    <Avatar style={url && style} size={size} {...props}>
      {!url && initials}
    </Avatar>
  )
}

export default Component
