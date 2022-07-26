import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@styled-icons/heroicons-outline";
import composeStyles from "src/utilities/composeStyles";
import { Tooltip } from "@advisable/donut";

const buttonClasses = composeStyles({
  base: `
    group
    flex
    justify-center
    items-center
    ring-1
    ring-inset
    ring-neutral200
    hover:ring-2
    hover:ring-neutral300
    rounded-full
  `,
  variants: {
    size: {
      sm: `h-8 min-w-[32px]`,
      md: `h-10 min-w-[40px]`,
    },
  },
});

const iconClasses = composeStyles({
  base: `
    fill-none
    stroke-neutral600
    group-hover:stroke-neutral900
  `,
  variants: {
    size: {
      sm: `h-[16px] w-[16px]`,
      md: `h-[20px] w-[20px]`,
    },
    active: `fill-blue500 !stroke-blue500 group-hover:fill-blue500`,
  },
});

function ShareArticleButton({ slug, className, size }) {
  const [copied, setCopied] = useState(false);
  const url = `${location.origin}/articles/${slug}`;

  const handleClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(false), 1700);
  };

  return (
    <div className="relative flex justify-center">
      <Tooltip placement="bottom" content={copied ? null : "Copy Link"}>
        <button
          className={buttonClasses({ className, size })}
          aria-label="Copy Link"
          onClick={handleClick}
        >
          <Link className={iconClasses({ size })} />
        </button>
      </Tooltip>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            exit={{ y: 20, opacity: 0 }}
            className="absolute -bottom-8 bg-blue100 rounded-xs shadow px-2 py-2"
          >
            <div className="text-blue900 text-xs leading-none whitespace-nowrap opacity-80">
              Link copied!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

ShareArticleButton.defaultProps = {
  size: "md",
};

export default ShareArticleButton;
