import { useState, useEffect } from "react";
import { useLocation } from "react-router";

function usePathnameQueue() {
  const location = useLocation();
  const [state, setState] = useState([location.pathname]);

  useEffect(() => {
    location.pathname !== state[0] &&
      setState((state) => [location.pathname, ...state]);
  }, [location.pathname, state]);

  const result =
    state[0] !== location.pathname ? [location.pathname, ...state] : state;

  return result;
}

export default usePathnameQueue;
