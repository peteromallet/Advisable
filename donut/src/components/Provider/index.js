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

  const theme = {
    responsiveProp: prop => {
      if (!isObject(prop)) return prop;
      return find(prop, (_, breakpoint) => {
        return breakpoints[breakpoint];
      });
    },
  };

  return (
    <Context.Provider>
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
