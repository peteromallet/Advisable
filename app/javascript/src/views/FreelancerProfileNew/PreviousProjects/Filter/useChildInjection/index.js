import React, { useMemo } from "react";

function useChildInjection(children, getPropsInjection) {
  const sections = useMemo(
    () =>
      React.Children.map(children, (child) =>
        React.cloneElement(child, {
          ...child.props,
          ...getPropsInjection(child),
        }),
      ),
    [children, getPropsInjection],
  );
  return sections;
}

export default useChildInjection;
