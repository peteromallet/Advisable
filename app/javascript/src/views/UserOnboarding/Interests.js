import Sticky from "react-stickynode";
import { ArrowSmRight, XCircle } from "@styled-icons/heroicons-solid";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import Button from "src/components/Button";
import { useCreateInterests, useDeleteInterest } from "./queries";
import SuggestedInterest from "./SuggestedInterest";
import InterestInput from "./InterestInput";
import SUGGESTED_INTERESTS from "./suggestedInterests";
import Arrow from "./Arrow";

export default function Interests({ data }) {
  const navigate = useNavigate();
  const [interests, setInterests] = useState(data.interests.map((i) => i.term));
  const [deleteInterest] = useDeleteInterest();
  const [createInterests, { loading }] = useCreateInterests();

  const addInterest = (interest) => {
    setInterests([...interests, interest]);
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));

    const savedInterest = data.interests.find((i) => i.term === interest);
    deleteInterest({
      variables: {
        input: { id: savedInterest.id },
      },
    });
  };

  const handleContinue = async () => {
    await createInterests({
      variables: {
        input: {
          terms: interests,
        },
      },
    });

    navigate("../complete");
  };

  const suggestedInterests = useMemo(() => {
    return SUGGESTED_INTERESTS.filter((i) => !interests.includes(i));
  }, [interests]);

  return (
    <div className="container mx-auto flex gap-12">
      <div className="pb-12 max-w-[680px] w-full shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white min-h-full p-10 rounded-xl shadow-xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight mb-2">
            What topics are you interested in?
          </h2>
          <p className="text-lg mb-10">
            Advisable helps you discover how other companies solved their
            problems and achieved their goals. To do this, we give you
            recommendations related to the topics you select.
          </p>

          <div className="mb-8">
            <InterestInput onAdd={addInterest} />
          </div>

          <YourInterests interests={interests} onRemove={removeInterest} />

          {interests.length > 0 ? (
            <Button
              size="lg"
              loading={loading}
              onClick={handleContinue}
              suffix={<ArrowSmRight />}
            >
              Continue
            </Button>
          ) : (
            <div className="flex max-w-[360px] gap-4 pl-5">
              <div className="flex-shrink-0 -mt-4">
                <Arrow />
              </div>
              Add any interests you like or pick from the list of popular
              interests
            </div>
          )}
        </motion.div>
      </div>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Sticky top={50} enabled>
          <SuggestedInterests
            suggestions={suggestedInterests}
            onClick={addInterest}
          />
        </Sticky>
      </motion.div>
    </div>
  );
}

function YourInterests({ interests, onRemove }) {
  if (interests.length === 0) return null;

  return (
    <div className="mb-10">
      <h4 className="uppercase text-sm font-medium mb-1">Your Interests</h4>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <div
            key={interest}
            className="pl-4 pr-3 py-2 rounded-full bg-neutral800 text-white inline-flex items-center gap-2"
          >
            {interest}
            <button className="inline-flex" onClick={() => onRemove(interest)}>
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
        Popular Topics
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
