import { useContext } from "react";
import { ThemeContext } from "styled-components";
import appContext from "../components/Provider/context";

const useTheme = () => {
  const theme = useContext(ThemeContext);
  const { setTheme } = useContext(appContext);
  const updateTheme = changes => {
    setTheme({ ...theme, ...changes });
  };

  return { theme, setTheme, updateTheme };
};

export default useTheme;
