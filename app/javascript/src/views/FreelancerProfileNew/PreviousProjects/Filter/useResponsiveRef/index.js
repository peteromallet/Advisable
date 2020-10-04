/*
 * This hook listen referenced element and update state on resize
 * For now it returns only width, but can be extended.
 */

import { useEffect, useCallback, useRef, useState } from "react";

function useResponsiveRef(action) {
  const [width, setWidth] = useState(null);
  const ref = useRef(null);

  const updateWidth = useCallback(
    (newWidth) => {
      setWidth(newWidth);
      newWidth !== width && action && action(newWidth);
    },
    [action, width],
  );

  const handleResize = useCallback(() => {
    const newWidth = ref.current.offsetWidth;
    updateWidth(newWidth);
  }, [updateWidth]);

  useEffect(() => {
    const width = ref.current.offsetWidth;
    updateWidth(width);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [action, handleResize, updateWidth]);

  return [ref, width];
}

export default useResponsiveRef;
