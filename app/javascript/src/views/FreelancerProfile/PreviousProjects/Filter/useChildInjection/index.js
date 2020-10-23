import React, { useMemo } from "react";

function useChildInjection(children, getPropsInjection) {
  const sections = useMemo(() => {
    let result = [];
    React.Children.forEach(children, (child) => {
      child &&
        result.push(
          React.cloneElement(child, {
            ...child.props,
            ...getPropsInjection(child),
          }),
        );
    });
    return result;
  }, [children, getPropsInjection]);
  return sections;
}

export default useChildInjection;
