import React from "react";
import reduce from "lodash/reduce";
import isObject from "lodash/isObject";
import find from "lodash/find";
import BaseStyles from "./BaseStyles";
import Context from "./context";
import useMediaQuery from "../../hooks/useMediaQuery";
import breakpointConfig from "../../breakpoints";
import { ThemeProvider } from "styled-components";

const DonutProvider = ({ children }) => {
  // Iterate through the breakpoints and build up an object determining which
  // breakpoints are active. This object will have a key of the breakpoint name
  // and a boolean value to indicate wether the breakpoint is active or not.
  // e.g { s: false, m: true, l: true }
  const breakpoints = reduce(
    breakpointConfig,
    (obj, mediaQuery, name) => {
      return {
        ...obj,
        [name]: useMediaQuery(mediaQuery),
      };
    },
    {}
  );

  const context = {
    breakpoints,
  };

  // We use a theme object for styled-components to be able to use donuts
  // 'responsive props' functionality inside of component styles.
  const theme = {
    responsiveProp: prop => {
      if (!isObject(prop)) return prop;
      return find(prop, (_, breakpoint) => {
        return breakpoints[breakpoint];
      });
    },
  };

  return (
    <Context.Provider value={context}>
      <ThemeProvider theme={theme}>
        <>
          <BaseStyles />
          {children}
        </>
      </ThemeProvider>
    </Context.Provider>
  );
};

export default DonutProvider;
