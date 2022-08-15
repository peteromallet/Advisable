import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, matchPath, useLocation } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import home from "./svg/home.svg";
import heart from "./svg/heart.svg";
import lightbulb from "./svg/lightbulb.svg";
import { useTopics } from "./queries";
import { ArrowSmLeft, ArrowSmRight } from "@styled-icons/heroicons-solid";
import useViewer from "src/hooks/useViewer";

const topicClasses = composeStyles({
  base: "topic",
  variants: {
    active: "active",
  },
});

function Topic({ to, name, icon, delay, ...props }) {
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
    <Link to={to} className={topicClasses({ active })} {...props}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
        className="topic-icon"
      >
        <div
          className="w-5 h-5"
          style={{
            backgroundImage: `url(${icon || home})`,
            backgroundPositionX: active ? -20 : 0,
          }}
        />
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
        className="topic-label"
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

const topicBarNavButton = composeStyles({
  base: `
    w-8
    h-8
    grid  
    z-10
    top-12
    absolute
    rounded-full
    bg-white
    shadow-sm hover:shadow-md
    place-items-center
    text-neutral-800 hover:text-blue-600
  `,
});

function TopicSkeleton() {
  return (
    <motion.div
      className={topicClasses()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="topic-icon">
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
  const viewer = useViewer();
  const { data, loading } = useTopics();
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(false);

  const calculateScrolls = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setScrollLeft(scrollLeft > 0);
    setScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useLayoutEffect(calculateScrolls, [loading]);

  const topics = data?.topics || [];

  const clickScrollRight = () => {
    const el = scrollRef.current;
    el.scrollTo({
      left: el.scrollLeft + (el.clientWidth - 80),
      behavior: "smooth",
    });
  };

  const clickScrollLeft = () => {
    const el = scrollRef.current;
    el.scrollTo({
      left: el.scrollLeft - (el.clientWidth - 80),
      behavior: "smooth",
    });
  };

  return (
    <div className={topicsBarClasses({ scrollLeft, scrollRight })}>
      <div
        className="scroll-container"
        ref={scrollRef}
        onScroll={calculateScrolls}
      >
        <AnimatePresence>
          {scrollLeft && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={clickScrollLeft}
              className={topicBarNavButton({
                className: "left-0",
              })}
            >
              <ArrowSmLeft className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {scrollRight && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={clickScrollRight}
              className={topicBarNavButton({
                className: "right-0",
              })}
            >
              <ArrowSmRight className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
        <div className="flex gap-8 sm:gap-10 lg:gap-12">
          {loading ? (
            [...Array(16)].map((_, i) => <TopicSkeleton key={i} />)
          ) : (
            <>
              <Topic name={`Your\nFeed`} to="/" />
              <Topic
                name={`Trending\nProjects`}
                to="/trending"
                icon={lightbulb}
                delay={ANIMATION_DELAY}
              />
              {viewer && (
                <Topic
                  aria-label="Your Favorites"
                  name={`Your\nFavorites`}
                  icon={heart}
                  to="/favorites"
                  delay={ANIMATION_DELAY * 2}
                />
              )}
              {topics.map((topic, i) => (
                <Topic
                  key={topic.id}
                  icon={topic.icon}
                  name={topic.name}
                  to={`/topics/${topic.slug}`}
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
