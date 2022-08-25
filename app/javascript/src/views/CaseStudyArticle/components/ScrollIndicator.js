import { AnimatePresence, motion } from "framer-motion"
import { ChevronDoubleDown } from "@styled-icons/heroicons-outline";
import React, { useEffect } from "react";

export default function ScrollIndicator() {
  const [isVisible, setVisibility] = React.useState(true);

  useEffect(() => {
    let el = document.getElementById("article-scrollable-area");

    const handleScroll = () => {
      if (!isVisible) return;

      let distance = !el ? window.scrollY : el.scrollTop;
      if (distance <= 10) return;

      setVisibility(false);
      (el || window).removeEventListener("scroll", handleScroll);
    };

    (el || window).addEventListener("scroll", handleScroll);
    return () => (el || window).removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const handleClick = () => {
    const content = document.getElementById("article-content-start");
    content.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          onClick={handleClick}
          className="fixed bottom-[5%] left-[50%] -translate-x-1/2 "
        >
          <motion.div
            className="flex gap-3 items-center bg-white hover:-translate-y-1 transition-transform rounded-full p-3 pr-11 drop-shadow-2xl cursor-pointer"
            exit={{ opacity: 0, scale: 0.9, y: -20 }}>
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
