import { useEffect } from "react";
import useTheme from "./useTheme";

export default function useBackground(background) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme((t) => ({ ...t, background }));
    return () => setTheme((t) => ({ ...t, background: "default" }));
  }, [setTheme, background]);
}
