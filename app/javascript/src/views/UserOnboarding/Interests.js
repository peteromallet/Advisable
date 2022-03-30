import React, { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import SuggestedInterest from "./SuggestedInterest";
import SUGGESTED_INTERESTS from "./suggestedInterests";

export default function Interests() {
  const scrollRef = useRef();
  const [top, setTop] = useState(true);

  useEffect(() => {
    const handleScroll = (e) => {
      const { scrollTop } = e.target;
      const isAtTop = scrollTop <= 4;
      if (isAtTop !== top) {
        setTop(isAtTop);
      }
    };

    const el = scrollRef.current.getScrollElement();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [top]);

  return (
    <div className="container mx-auto flex gap-12">
      <div className="pb-12 max-w-[640px] w-full">
        <div className="bg-white min-h-full p-10 rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold tracking-tight mb-2">
            What topics are you interested in?
          </h2>
          <p className="text-lg">
            With Advisable you can discover how other companies solved their
            problems and achieved their goals. Add the types of projects you‘d
            like to see below.
          </p>
        </div>
      </div>
      <div className="w-full">
        <h4 className="uppercase text-xs font-medium text-neutral-400 mb-3">
          Popular Interests
        </h4>
        <SimpleBar
          ref={scrollRef}
          className="onboarding_interests"
          data-top={top}
        >
          <div className="flex flex-wrap gap-3 pb-12">
            {SUGGESTED_INTERESTS.map((interest, i) => (
              <SuggestedInterest key={i}>{interest}</SuggestedInterest>
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
