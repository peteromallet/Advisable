import React, { useMemo } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

export function Versioned({ fallback, name, versions }) {
  const location = useLocation();
  const versionNumber = useMemo(() => {
    const { version } = queryString.parse(location.search);
    if (version) sessionStorage.setItem(name, version);
    return sessionStorage.getItem(name);
  }, [location, name]);

  const component = versions[versionNumber] || fallback;
  return React.cloneElement(component);
}
