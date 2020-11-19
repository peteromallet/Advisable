import React, { useContext, useState } from "react";

export const SharedOrbitsContext = React.createContext([null, null]);

export default function SharedOrbitsProvider({ children }) {
  const [state, setState] = useState();
  return (
    <SharedOrbitsContext.Provider value={[state, setState]}>
      {children}
    </SharedOrbitsContext.Provider>
  );
}

export function useSharedOrbits() {
  const context = useContext(SharedOrbitsContext);
  return context;
}
