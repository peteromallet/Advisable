import React from "react";
import BaseStyles from "./BaseStyles";
import Context from "./context";
import { ThemeProvider } from "styled-components";
import useBreakpoints from "../../hooks/useBreakpoints";
import theme from "../../theme";

const DonutProvider = ({ children }) => {
  const breakpoints = useBreakpoints();
  const [currentTheme, setTheme] = React.useState(theme);

  const context = {
    breakpoints,
    setTheme,
  };

  return (
    <Context.Provider value={context}>
      <ThemeProvider theme={currentTheme}>
        <>
          <BaseStyles />
          {children}
        </>
      </ThemeProvider>
    </Context.Provider>
  );
};

export default DonutProvider;
