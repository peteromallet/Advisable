import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, matchPath, useLocation } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import home from "./svg/home.svg";
import heart from "./svg/heart.svg";
import lightbulb from "./svg/lightbulb.svg";
import { useTopics } from "./queries";

const topicClasses = composeStyles({
  base: "topic",
  variants: {
    active: "active",
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
      <div className="topic-icon">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay }}
          className="w-5 h-5"
          style={{
            backgroundImage: `url(${icon || home})`,
            backgroundPositionX: active ? -20 : 0,
          }}
        />
      </div>
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
                name={`Trending\nProjects`}
                to="/explore/trending"
                icon={lightbulb}
                delay={ANIMATION_DELAY}
              />
              <Topic
                name={`Your\nFavourites`}
                icon={heart}
                to="/explore/favorites"
                delay={ANIMATION_DELAY * 2}
              />
              {topics.map((topic, i) => (
                <Topic
                  key={topic.id}
                  icon={topic.icon}
                  name={topic.name}
                  to={`/explore/${topic.slug}`}
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
