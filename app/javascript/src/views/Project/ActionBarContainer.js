import React, {
  createContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";

export const ActionBarContext = createContext();

export default function ActionBarContainer({ children }) {
  const [position, setPosition] = useState({ left: 0, width: 0 });
  const container = useRef(null);

  const calculatePosition = useCallback(() => {
    setPosition({
      left: container.current.offsetLeft,
      width: container.current.clientWidth,
    });
  }, []);

  useEffect(() => {
    calculatePosition();
    window.addEventListener("resize", calculatePosition);

    return () => {
      window.removeEventListener("resize", calculatePosition);
    };
  }, [calculatePosition]);

  return (
    <ActionBarContext.Provider value={position}>
      <div ref={container}>{children}</div>
    </ActionBarContext.Provider>
  );
}
