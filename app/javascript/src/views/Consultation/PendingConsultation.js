import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Card, Text, RoundedButton } from "@advisable/donut";
import DECLINE from "./declineConsultation";
import ACCEPT from "./acceptConsultation";

const PendingConsultation = ({ data }) => {
  const history = useHistory();
  const [declineConsultation, declineMutation] = useMutation(DECLINE);
  const [acceptConsultation, acceptMutation] = useMutation(ACCEPT);
  const { id, topic, specialist, user } = data.consultation;

  const handleDecline = async () => {
    await declineConsultation({
      variables: { input: { consultation: id } },
    });
  };

  const handleAccept = async () => {
    const response = await acceptConsultation({
      variables: { input: { consultation: id } },
    });

    const interview = response.data.acceptConsultation.interview;
    history.push(`/interview_request/${interview.airtableId}`);
  };

  const isLoading = declineMutation.loading;

  return (
    <Card padding="xl">
      <Text
        mb="xs"
        as="h2"
        fontSize="xxl"
        color="blue.8"
        fontWeight="semibold"
        letterSpacing="-0.025em"
      >
        {specialist.name} - Consultation Request
      </Text>

      <Text fontSze="m" lineHeight="s" mb="m">
        {user.name}, from {user.companyName}, has made a request for a 30-minute
        consultation with you.
      </Text>

      <Text fontWeight="medium" mb="xxs">
        What they'd like to cover in a consultation:
      </Text>
      <Text lineHeight="s" color="neutral.7" mb="xl">
        {topic}
      </Text>
      <RoundedButton
        mr="xs"
        disabled={isLoading}
        onClick={handleAccept}
        loading={acceptMutation.loading}
      >
        Accept Request
      </RoundedButton>
      <RoundedButton
        variant="secondary"
        onClick={handleDecline}
        loading={declineMutation.loading}
      >
        Decline Request
      </RoundedButton>
    </Card>
  );
};

export default PendingConsultation;
