import { useEffect, useState } from "react";

export const useScrolledToBottom = () => {
  const [bottomReached, setBottomReached] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrolled, true);
    return () => window.removeEventListener("scroll", scrolled);
  }, []);

  const scrolled = ({ target }) => {
    const { scrollHeight, scrollTop, clientHeight } = target;
    const reached = scrollHeight - scrollTop === clientHeight;
    setBottomReached(reached);
  };

  return { bottomReached };
};
