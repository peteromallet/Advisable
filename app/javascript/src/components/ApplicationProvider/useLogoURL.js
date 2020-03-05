import { useContext, useEffect } from "react";
import applicationContext from "../../applicationContext";

function useLogoURL(url) {
  const context = useContext(applicationContext);

  useEffect(() => {
    if (url) {
      context.setLogoURL(url);
      return () => context.setLogoURL("/");
    }
  }, []);

  return context.logoURL;
}

export default useLogoURL;
