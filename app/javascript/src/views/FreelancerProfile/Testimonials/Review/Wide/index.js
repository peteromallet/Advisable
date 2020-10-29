import React from "react";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import useVariants from "components/VariantSystem/useVariants";
import Fourth from "./Fourth";
import Fifth from "./Fifth";
import Sixth from "./Sixth";

function Wide(props) {
  const { variant } = useVariants();
  console.log("variant", variant);
  const variants = {
    1: First,
    2: Second,
    3: Third,
    4: Fourth,
    5: Fifth,
    6: Sixth,
  };
  const Component = variants[variant] || Sixth;
  return <Component {...props} />;
}

export default Wide;
