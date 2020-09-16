import { useState, useCallback } from "react";

export const useToggle = (initialIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return [isOpen, toggle];
};
