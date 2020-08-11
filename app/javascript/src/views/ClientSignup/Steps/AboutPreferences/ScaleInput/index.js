import React from "react";
import useVariants from "../../../../../components/VariantSystem/useVariants";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Fourth from "./Fourth";
import Fifth from "./Fifth";
import Zero from "./Zero";

function ScaleInput(props) {
  const { variant } = useVariants();
  const Components = {
    0: <Zero {...props} />,
    1: <First {...props} />,
    2: <Second {...props} />,
    3: <Third {...props} />,
    4: <Fourth {...props} />,
    5: <Fifth {...props} />,
  };
  return Components[variant] || Components[5];
}

ScaleInput.propTypes = {};

export default ScaleInput;
