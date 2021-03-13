import React from "react";
import Share from "./Share";
import DurationDate from "./DurationDate";
import RegisterButton from "./RegisterButton";

export default function DetailsAside({
  event,
  handleEventRegistration,
  unregisterable,
}) {
  return (
    <>
      <DurationDate mb="4" startsAt={event.startsAt} endsAt={event.endsAt} />
      <RegisterButton
        disabled={unregisterable}
        attending={event.attending}
        onClick={handleEventRegistration}
      />
      <Share
        mb="8"
        event={event}
        width="100%"
        css={`
          color: #234ee4;
          background-color: #edeffd;
          &:hover {
            background-color: #edeffd !important;
          }
        `}
      />
    </>
  );
}
