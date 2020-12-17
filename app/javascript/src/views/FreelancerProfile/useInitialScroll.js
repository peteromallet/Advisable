import { useEffect, useState } from "react";
import { useBreakpoint } from "@advisable/donut";

export default function useInitialScroll(data) {
  const [isScrolled, setIsScrolled] = useState(false);
  const widescreen = useBreakpoint("sUp");

  useEffect(() => {
    if (window.history) {
      window.history.scrollRestoration = "manual"; // disable automatic scroll restoration
    }
    const coverImgElement = document.getElementById("cover-img-wrapper");
    const offset = coverImgElement?.offsetTop;
    const height = coverImgElement?.offsetHeight;
    const HEADER = 58;
    const scrollY = offset - HEADER + (height / 100) * 64;
    if (widescreen && data && scrollY && !isScrolled) {
      window.scrollTo(0, scrollY);
      setIsScrolled(true);
    }
  }, [data, isScrolled, widescreen]);
}
