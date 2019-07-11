import React from "react";
import feather from "feather-icons";
import { Icon as IconStyles } from "./styles";

const Icon = ({ icon, strokeWidth, color, ...props }) => {
  const options = {
    "stroke-width": strokeWidth,
    ...props,
  };

  const html = {
    __html: feather.icons[icon].toSvg(options),
  };

  return <IconStyles color={color} dangerouslySetInnerHTML={html} />;
};

Icon.defaultProps = {
  strokeWidth: 2,
};

export default Icon;
