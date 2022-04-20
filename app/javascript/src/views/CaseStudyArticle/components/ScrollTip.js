import React, { useLayoutEffect, useState } from "react";
import { ChevronDoubleDown } from "@styled-icons/heroicons-solid";

export default function ScrollTip() {
  const [offsetX, setOffsetX] = useState();
  const [offsetY, setOffsetY] = useState();
  const [hidden, setHidden] = useState();

  useLayoutEffect(() => {
    const handlePosition = () => {
      const introElement = document?.getElementById("caseStudyIntro");
      const introRect = introElement?.getBoundingClientRect();
      const offsetX = Math.round(introRect?.left);
      const offsetY = Math.max(window?.innerHeight - introRect?.bottom, 0);
      setOffsetX(offsetX || 0);
      setOffsetY(offsetY || 0);
    };
    const handleScroll = () => {
      const hidden = Boolean(window.scrollY);
      hidden && window.removeEventListener("scroll", handleScroll);
      setHidden(hidden);
    };

    handlePosition();
    handleScroll();

    window.addEventListener("resize", handlePosition);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handlePosition);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!offsetX) return null;

  return (
    <div
      style={{
        opacity: hidden ? "0" : "1",
        bottom: offsetY,
      }}
      className="transition-all fixed right-0 left-0 h-36 flex justify-start items-end pb-8 bg-gradient-to-t from-white via-white to-transparent pointer-events-none"
    >
      <div
        style={{
          marginLeft: `${offsetX}px`,
          transform: hidden ? "scale(0.90)" : "scale(1)",
        }}
        className="transition-all flex items-center gap-3 transform-"
      >
        <div className="h-11 w-11 p-3 bg-white shadow-lg rounded-full flex justify-center items-center">
          <ChevronDoubleDown className="fill-red400" />
        </div>
        <div>
          <div className="text-xs text-neutral400 font-[550] leading-none pt-px uppercase">
            Scroll to
          </div>
          <div className="text-lg leading-5 pt-px text-neutral900">
            Read more
          </div>
        </div>
      </div>
    </div>
  );
}
