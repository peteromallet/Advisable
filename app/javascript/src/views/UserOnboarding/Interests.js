import { XCircle } from "@styled-icons/heroicons-solid";
import React, { useEffect, useMemo, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import { useCreateInterest, useDeleteInterest } from "./queries";
import SuggestedInterest from "./SuggestedInterest";
import SUGGESTED_INTERESTS from "./suggestedInterests";

export default function Interests({ data }) {
  const [createInterest] = useCreateInterest();

  const addInterest = (interest) => {
    createInterest({
      variables: {
        input: { term: interest },
      },
      optimisticResponse: {
        createCaseStudyInterest: {
          interest: {
            __typename: "CaseStudyInterest",
            id: "PENDING",
            term: interest,
          },
        },
      },
    });
  };

  const interests = data.interests;
  const suggestedInterests = useMemo(() => {
    const interestTerms = data.interests.map((i) => i.term);
    return SUGGESTED_INTERESTS.filter((i) => !interestTerms.includes(i));
  }, [data]);

  return (
    <div className="container mx-auto flex gap-12">
      <div className="pb-12 max-w-[680px] w-full">
        <div className="bg-white min-h-full p-10 rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold tracking-tight mb-2">
            What topics are you interested in?
          </h2>
          <p className="text-lg mb-10">
            With Advisable you can discover how other companies solved their
            problems and achieved their goals. Add the types of projects you‘d
            like to see below.
          </p>

          <YourInterests interests={interests} />
        </div>
      </div>
      <div className="w-full">
        <SuggestedInterests
          suggestions={suggestedInterests}
          onClick={addInterest}
        />
      </div>
    </div>
  );
}

function YourInterests({ interests }) {
  const [deleteInterest] = useDeleteInterest();

  if (interests.length === 0) return null;

  const removeInterest = (interest) => {
    deleteInterest({
      variables: {
        input: { id: interest.id },
      },
      update(cache) {
        cache.modify({
          fields: {
            interests(existingInterests) {
              return existingInterests.filter((i) => i.id !== interest.id);
            },
          },
        });
      },
    });
  };

  return (
    <div>
      <h4 className="uppercase text-sm font-medium mb-1">Your Interests</h4>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <div
            key={interest.id}
            className="pl-4 pr-3 py-2 rounded-full bg-neutral800 text-white inline-flex items-center gap-2"
          >
            {interest.term}
            <button
              className="inline-flex"
              onClick={() => removeInterest(interest)}
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuggestedInterests({ suggestions, onClick }) {
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
    <>
      <h4 className="uppercase text-xs font-medium text-neutral-400 mb-3">
        Popular Interests
      </h4>
      <SimpleBar
        ref={scrollRef}
        className="onboarding_interests"
        data-top={top}
      >
        <div className="flex flex-wrap gap-3 pb-12">
          {suggestions.map((interest, i) => (
            <SuggestedInterest key={i} onClick={() => onClick(interest)}>
              {interest}
            </SuggestedInterest>
          ))}
        </div>
      </SimpleBar>
    </>
  );
}
