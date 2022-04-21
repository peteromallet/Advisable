import React from "react";
import { ChevronDoubleDown } from "@styled-icons/heroicons-solid";

export default function ScrollTip() {
  const handleClick = () => {
    const content = document.getElementById("content");
    window.scrollTo({
      top: content.offsetTop - 200,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="inline-flex items-center gap-3 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="h-11 w-11 p-3 bg-white shadow-lg rounded-full flex justify-center items-center transition-all group-hover:scale-[1.12]">
        <ChevronDoubleDown className="group-hover:text-blue500" />
      </div>
      <div>
        <div className="text-xs text-neutral400 font-[550] leading-none pt-px uppercase">
          Scroll to
        </div>
        <div className="text-lg leading-5 pt-px text-neutral900">Read more</div>
      </div>
    </div>
  );
}
