import React from "react";
import { Redirect } from "react-router-dom";
import { Text, Paragraph } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";

export default function MoreTimeOptionsAdded({ interview }) {
  const viewer = useViewer();
  const isSpecialist = viewer.isSpecialist;

  return isSpecialist ? (
    <MoreTimeOptionsAddedAsSpecialist interview={interview} />
  ) : (
    <MoreTimeOptionsAddedAsClient interview={interview} />
  );
}

function MoreTimeOptionsAddedAsSpecialist({ interview }) {
  return <Redirect to={`/interview_request/${interview.id}`} />;
}

function MoreTimeOptionsAddedAsClient({ interview }) {
  return (
    <>
      <Text fontSize="2xl" fontWeight="medium" marginBottom="xs">
        Waiting confirmation from {interview.specialist.firstName}
      </Text>
      <Paragraph marginBottom="lg">
        We have sent your updated availability to{" "}
        {interview.specialist.firstName}. We will let you know once they select
        a time to confirm the call.
      </Paragraph>
    </>
  );
}
