import React from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import useViewer from "src/hooks/useViewer";

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
        <span key={f.key}>{f}, </span>
      ))}
      and {last}
    </>
  );
};

const Available = ({ collaborationTypes }) => {
  const availableFor = collaborationTypes.map((t) => COLLABORATION_TYPES[t]);
  const availabilities = availableFor.map((a, i) => (
    <b key={i} className="font-semibold text-neutral-900">
      {a}
    </b>
  ));

  return (
    <div>
      <p className="mb-2 text-neutral900 max-w-[420px]">
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
    <p className="mb-2 text-neutral900">
      You are currently{" "}
      <b className="font-semibold text-neutral900">unavailable</b> for work.
    </p>
  );
};

export default function Availability() {
  const viewer = useViewer();
  const isAvailable = viewer.unavailableUntil
    ? DateTime.fromISO(viewer.unavailableUntil) <= DateTime.now()
    : true;

  return (
    <div>
      {isAvailable ? (
        <Available collaborationTypes={viewer.collaborationTypes} />
      ) : (
        <Unavailable />
      )}
      <Link
        to="/settings/availability"
        className="font-medium underline text-neutral-600 underline-offset-8 decoration-2 decoration-neutral-200 hover:text-blue700"
      >
        Update availability
      </Link>
    </div>
  );
}
