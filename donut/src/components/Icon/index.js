import React from "react";
import feather from "feather-icons";
import { Icon as IconStyles } from "./styles";

const Icon = ({ icon, strokeWidth, color, width, height, ...props }) => {
  const options = {
    "stroke-width": strokeWidth,
    width,
    height,
  };

  const html = {
    __html: feather.icons[icon].toSvg(options),
  };

  return <IconStyles color={color} dangerouslySetInnerHTML={html} {...props} />;
};

Icon.defaultProps = {
  height: 24,
  width: 24,
  strokeWidth: 2,
};

export default Icon;
