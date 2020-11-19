import React, { useContext, useState } from "react";

export const SharedStateContext = React.createContext([null, null]);

export default function SharedStateProvider({ children }) {
  const [state, setState] = useState();
  return (
    <SharedStateContext.Provider value={[state, setState]}>
      {children}
    </SharedStateContext.Provider>
  );
}

export function useSharedState() {
  const context = useContext(SharedStateContext);
  return context;
}
