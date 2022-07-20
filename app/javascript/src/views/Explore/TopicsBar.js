import React, { useLayoutEffect, useRef, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import inbox from "./svg/inbox.svg";
import favorites from "./svg/favorites.svg";
import lightbulb from "./svg/lightbulb.svg";

const topicClasses = composeStyles({
  base: "topic shrink-0 flex flex-col items-center",
  variants: {
    active: "active",
  },
});

const iconClasses = composeStyles({
  base: `topic-icon w-10 h-10 bg-white rounded-full shadow-md mb-2 grid place-items-center`,
  variants: {
    active: ``,
  },
});

function Topic({ to, name, icon }) {
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
        <svg width="20" height="20" viewBox="0 0 20 20">
          <use href={`${inbox}#icon`} />
        </svg>
      </div>
      <span className="text-xs text-neutral-500">{renderLineBreaks(name)}</span>
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

export default function TopicsBar() {
  const scrollRef = useRef();
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(false);

  const calculateScrolls = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setScrollLeft(scrollLeft > 0);
    setScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useLayoutEffect(calculateScrolls, []);

  return (
    <div className={topicsBarClasses({ scrollLeft, scrollRight })}>
      <div
        className="scroll-container"
        ref={scrollRef}
        onScroll={calculateScrolls}
      >
        <div className="flex gap-10">
          <Topic name={`Your\nFeed`} to="/explore" />
          <Topic name={`Your\nFeed`} to="/explore/trending" icon={lightbulb} />
          <Topic name={`Your\nFeed`} to="/explore/favorites" icon={favorites} />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
          <Topic name={`Your\nFeed`} to="/explore/topic" />
        </div>
      </div>
    </div>
  );
}
