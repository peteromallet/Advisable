import React from "react";
import feather from "feather-icons";
import { Icon as Wrapper } from "./styles";

export default ({ icon, strokeWidth, ...props }) => {
  const options = {
    'stroke-width': strokeWidth,
    ...props
  }

  const html = {
    __html: feather.icons[icon].toSvg(options)
  };
  return <Wrapper className='Icon' dangerouslySetInnerHTML={html} />;
};
