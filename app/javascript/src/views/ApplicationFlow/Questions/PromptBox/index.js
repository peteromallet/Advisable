import React from "react";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Fourth from "./Fourth";
import Fifth from "./Fifth";
import useVariants from "../../../../components/VariantSystem/useVariants";

function PromptBox(props) {
  const { variant } = useVariants();
  const variants = {
    1: First,
    2: Second,
    3: Third,
    4: Fourth,
    5: Fifth,
  };

  const Component = Fifth;

  return <Component {...props} />;
}

export default PromptBox;
