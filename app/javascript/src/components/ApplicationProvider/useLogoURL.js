import { useContext, useEffect } from "react";
import useViewer from "src/hooks/useViewer";
import applicationContext from "../../applicationContext";

function useLogoURL(url) {
  const context = useContext(applicationContext);
  const viewer = useViewer();

  useEffect(() => {
    if (!viewer) {
      context.setLogoURL("https://advisable.com/");
      return () => context.setLogoURL("/");
    }
    if (url) {
      context.setLogoURL(url);
      return () => context.setLogoURL("/");
    }
  }, []);

  return context.logoURL;
}

export default useLogoURL;
