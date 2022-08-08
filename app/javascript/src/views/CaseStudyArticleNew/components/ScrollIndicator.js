import { ChevronDoubleDown } from "@styled-icons/heroicons-outline";
import React, { useEffect } from "react";

export default function ScrollIndicator() {
  const [isVisible, setVisibility] = React.useState(true);

  useEffect(() => {
    let scrollableArea = document.getElementById("article-scrollable-area");
    const handleScroll = () => {
      if (scrollableArea.scrollTop > 0) {
        setVisibility(false);
        scrollableArea.removeEventListener("scroll", handleScroll);
      }
    };

    scrollableArea.addEventListener("scroll", handleScroll);
    return () => scrollableArea.removeEventListener("scroll", handleScroll);
  }, []);

  const visibility = isVisible ? "visible" : "hidden";

  const handleClick = () => {
    const content = document.getElementById("article-content-start");
    content.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className={`${visibility} fixed flex gap-3 items-center bottom-[5%] left-[50%] bg-white -translate-x-1/2 hover:-translate-y-1 transition-transform rounded-full p-3 pr-11 drop-shadow-2xl cursor-pointer`}
      onClick={handleClick}
    >
      <div className="rounded-full bg-neutral50 w-[40px] h-[40px] flex items-center justify-center">
        <ChevronDoubleDown size={20} className="stroke-blue500" />
      </div>
      <div>
        <div className="uppercase text-xs text-neutral400 font-medium leading-none">
          Scroll to
        </div>
        <div className="text-neutral700 leading-5 font-medium">
          Read full case study
        </div>
      </div>
    </div>
  );
}
