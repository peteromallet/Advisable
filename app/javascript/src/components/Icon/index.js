import React from "react";
import feather from "feather-icons";
import { Icon as Wrapper } from "./styles";

export default ({ icon, ...props }) => {
  const html = {
    __html: feather.icons[icon].toSvg(props)
  };
  return <Wrapper className='Icon' dangerouslySetInnerHTML={html} />;
};
