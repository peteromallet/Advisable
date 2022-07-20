import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, matchPath, useLocation } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import inbox from "./svg/inbox.svg";
import favorites from "./svg/favorites.svg";
import lightbulb from "./svg/lightbulb.svg";
import { useTopics } from "./queries";

const topicClasses = composeStyles({
  base: "topic shrink-0 flex flex-col items-center",
  variants: {
    active: "active",
  },
});

const iconClasses = composeStyles({
  base: `topic-icon bg-white rounded-full shadow-md mb-2 grid place-items-center`,
  variants: {
    active: ``,
  },
});

function Topic({ to, name, icon, delay }) {
  const location = useLocation();
  const match = matchPath(
    {
      path: to,
      end: true,
    },
    location.pathname,
  );

  const active = Boolean(match);

  return (
    <Link to={to} className={topicClasses({ active })}>
      <div className={iconClasses({ active })}>
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <use href={`${inbox}#icon`} />
        </motion.svg>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
        className="text-xs text-center text-neutral-500"
      >
        {renderLineBreaks(name)}
      </motion.span>
    </Link>
  );
}

const topicsBarClasses = composeStyles({
  base: "w-full py-6 topics-bar",
  variants: {
    scrollLeft: "topics-bar--scroll-left",
    scrollRight: "topics-bar--scroll-right",
  },
});

function TopicSkeleton() {
  return (
    <motion.div
      className={topicClasses()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={iconClasses()}>
        <div className="w-5 h-5 rounded-md bg-neutral-200 animate-pulse" />
      </div>
      <div className="w-[32px] h-[8px] bg-neutral-200 rounded animate-pulse my-1 mb-1.5" />
      <div className="w-[24px] h-[8px] bg-neutral-200 rounded animate-pulse" />
    </motion.div>
  );
}

const ANIMATION_DELAY = 0.025;

export default function TopicsBar() {
  const scrollRef = useRef();
  const { loading } = useTopics();
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(false);

  const calculateScrolls = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setScrollLeft(scrollLeft > 0);
    setScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useLayoutEffect(calculateScrolls, [loading]);

  return (
    <div className={topicsBarClasses({ scrollLeft, scrollRight })}>
      <div
        className="scroll-container"
        ref={scrollRef}
        onScroll={calculateScrolls}
      >
        <div className="flex gap-12">
          {loading ? (
            [...Array(16)].map((_, i) => <TopicSkeleton key={i} />)
          ) : (
            <>
              <Topic name={`Your\nFeed`} to="/explore" />
              <Topic
                name={`Your\nFeed`}
                to="/explore/trending"
                icon={lightbulb}
                delay={ANIMATION_DELAY}
              />
              <Topic
                name={`Your\nFeed`}
                to="/explore/favorites"
                icon={favorites}
                delay={ANIMATION_DELAY * 2}
              />
              {[...Array(16)].map((_, i) => (
                <Topic
                  name={`Email\nMarketing`}
                  to={`/explore/${i}`}
                  key={i}
                  delay={ANIMATION_DELAY * 2 + ANIMATION_DELAY * i}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
