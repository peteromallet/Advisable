import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "@styled-icons/heroicons-solid";

export default function ScrollIndicator() {
  const [isVisible, setVisibility] = React.useState(true);

  useEffect(() => {
    let el = document.getElementById("article-scrollable-area");

    const handleScroll = () => {
      let distance = !el ? window.scrollY : el.scrollTop;
      if (distance <= 10 && !isVisible) {
        setVisibility(true);
      }

      if (distance >= 10 && isVisible) {
        setVisibility(false);
      }
    };

    (el || window).addEventListener("scroll", handleScroll);
    return () => (el || window).removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const handleClick = () => {
    const content = document.getElementById("article-content-start");
    content.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <div
          onClick={handleClick}
          className="fixed bottom-5 left-[50%] -translate-x-1/2 "
        >
          <motion.div
            className="flex gap-2 items-center p-2 pr-6 rounded-full cursor-pointer bg-blue900 shadow-pop"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex justify-center items-center rounded-full bg-transparent-white-20 w-[32px] h-[32px]">
              <ArrowDown className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="mb-0.5 text-sm font-medium leading-none text-transparent-white-60">
                Scroll to
              </div>
              <div className="font-medium leading-none text-transparent-white-90">
                Read more
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
