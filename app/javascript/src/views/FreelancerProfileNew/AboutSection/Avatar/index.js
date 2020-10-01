import React from "react";
import First from "./First";
import Second from "./Second";

function Avatar({ ...props }) {
  const Variants = {
    1: First,
    2: Second,
  };
  const Component = Variants[2];
  return <Component {...props} />;
}

export default Avatar;
