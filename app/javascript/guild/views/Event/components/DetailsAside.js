import React from "react";
import DurationDate from "./DurationDate";
import RegisterButton from "./RegisterButton";

export default function DetailsAside({
  event,
  handleEventRegistration,
  unregisterable,
  eventStatus,
}) {
  return (
    <>
      <DurationDate mb="4" startsAt={event.startsAt} endsAt={event.endsAt} />
      <RegisterButton
        disabled={unregisterable}
        attending={event.attending}
        eventStatus={eventStatus}
        onClick={handleEventRegistration}
      />
    </>
  );
}
