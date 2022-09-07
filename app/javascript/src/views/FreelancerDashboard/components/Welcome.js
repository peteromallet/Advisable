import React from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import useViewer from "src/hooks/useViewer";
import GradientHighlight from "src/components/GradientHighlight";

const COLLABORATION_TYPES = {
  hands_on: "Hands-On Work",
  consultancy: "Consultations",
  mentorship: "Mentoring",
};

const CommaSeparated = ({ children }) => {
  if (children.length === 0) return;
  if (children.length === 1) return children;
  if (children.length === 2)
    return (
      <>
        {children[0]} and {children[1]}
      </>
    );
  const firsts = children.slice(0, children.length - 1);
  const last = children[children.length - 1];
  return (
    <>
      {firsts.map((f) => (
        <>{f}, </>
      ))}
      and {last}
    </>
  );
};

const Available = ({ collaborationTypes }) => {
  const availableFor = collaborationTypes.map((t) => COLLABORATION_TYPES[t]);
  const availabilities = availableFor.map((a, i) => (
    <b key={i} className="font-bold text-neutral900">
      {a}
    </b>
  ));

  return (
    <div>
      <p className="text-neutral900 mb-1">
        You are currently available for{" "}
        {availabilities.length ? (
          <CommaSeparated>{availabilities}</CommaSeparated>
        ) : (
          "work"
        )}
        .
      </p>
    </div>
  );
};

const Unavailable = () => {
  return (
    <p className="text-neutral900 mb-1">
      You are currently not available for work
    </p>
  );
};

export default function Welcome() {
  const viewer = useViewer();
  const { unavailableUntil, collaborationTypes } = viewer;
  const isAvailable = unavailableUntil
    ? DateTime.fromISO(unavailableUntil) <= DateTime.now()
    : true;

  return (
    <div className="self-center pb-12 lg:pb-0">
      <p className="text-4xl text-neutral900 font-semibold tracking-tight mb-4">
        <GradientHighlight>Welcome back, </GradientHighlight>
        {viewer.firstName}
      </p>
      {isAvailable ? (
        <Available collaborationTypes={collaborationTypes} />
      ) : (
        <Unavailable />
      )}
      <Link
        to="/settings/availability"
        className="text-blue500 hover:text-blue700 font-semibold underline underline-offset-8 decoration-2 decoration-blue200"
      >
        Update availability
      </Link>
    </div>
  );
}
