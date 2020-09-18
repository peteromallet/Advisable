import React from "react";
import { Link, Circle } from "@advisable/donut";

function IconLink({ Icon, url, strokeWidth }) {
  return (
    <Link.External href={url} mx="xxs" target="_blank">
      <Circle size={42} bg="neutral100" color="neutral600">
        <Icon size={24} strokeWidth={strokeWidth} />
      </Circle>
    </Link.External>
  );
}

export default IconLink;
