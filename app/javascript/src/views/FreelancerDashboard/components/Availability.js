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
        <>{f}, </>
      ))}
      and {last}
    </>
  );
};

const Available = ({ collaborationTypes }) => {
  const availableFor = collaborationTypes.map((t) => COLLABORATION_TYPES[t]);
  const availabilities = availableFor.map((a, i) => (
    <b key={i} className="font-bold text-blue-900">
      {a}
    </b>
  ));

  return (
    <div>
      <p className="text-neutral900 mb-1 max-w-[480px]">
        You are currently available for{" "}
        {availabilities.length ? (
          <span>
            <CommaSeparated>{availabilities}</CommaSeparated>
          </span>
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
      You are currently{" "}
      <b className="font-semibold text-neutral800">not available</b> for work
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
        className="text-blue500 hover:text-blue700 font-semibold underline underline-offset-8 decoration-2 decoration-blue200"
      >
        Update availability
      </Link>
    </div>
  );
}
