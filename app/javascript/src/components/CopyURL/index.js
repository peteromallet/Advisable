import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CopyURL as Wrapper } from "./styles";

const CopyURL = ({ bg, children }) => {
  const inputRef = React.useRef(null);
  const [copied, setCopied] = React.useState(false);

  const handleClick = () => {
    inputRef.current.select();
  };

  const handleCopy = () => {
    setCopied(true);
    window.navigator.clipboard.writeText(children);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Wrapper bg={bg}>
      <input ref={inputRef} value={children} onClick={handleClick} readOnly />
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            exit={{ y: -16, opacity: 0 }}
            className="z-[2] absolute -top-7 right-1 bg-blue100 rounded-xs shadow px-2 py-2"
          >
            <div className="text-blue900 text-xs leading-none opacity-80">
              Link copied!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" aria-label="copy url" onClick={handleCopy}>
        Copy
      </button>
    </Wrapper>
  );
};

export default CopyURL;
