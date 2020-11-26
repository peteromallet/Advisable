import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const setQueue = (state, value, limit) =>
  state[0] !== value ? [value, ...state].slice(0, limit) : state;

function useQueue(value, limit = Infinity) {
  const [state, setState] = useState([value]);
  // Store update in state
  useEffect(() => {
    setState((state) => setQueue(state, value, limit));
  }, [limit, value, state]);
  // Return the most recent update
  return setQueue(state, value, limit);
}

function usePathnameQueue(limit = Infinity) {
  const location = useLocation();
  const state = useQueue(location.pathname, limit);
  return state;
}

export default usePathnameQueue;
