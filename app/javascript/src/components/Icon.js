import React from "react";
import styled from 'styled-components';
import feather from "feather-icons";

export const Icon = styled.span`
  svg {
    vertical-align: middle;
    display: block;
  }
`

export default ({ icon, ...props }) => {
  const html = {
    __html: feather.icons[icon].toSvg(props)
  };
  return <Icon className='Icon' dangerouslySetInnerHTML={html} />;
};
