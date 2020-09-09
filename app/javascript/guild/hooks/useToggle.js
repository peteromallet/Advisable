import { useState } from "react";

export const useToggle = (initialIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const toggle = () => setIsOpen(!isOpen);

  return [isOpen, toggle];
};
