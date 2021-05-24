import { useContext, useCallback } from "react";
import { ThemeContext } from "styled-components";
import appContext from "../components/Provider/context";

const useTheme = () => {
  const theme = useContext(ThemeContext);
  const { setTheme } = useContext(appContext);
  const updateTheme = useCallback(
    (changes) => {
      setTheme({ ...theme, ...changes });
    },
    [setTheme, theme],
  );

  return { theme, setTheme, updateTheme };
};

export default useTheme;
