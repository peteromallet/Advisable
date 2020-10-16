import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Card, Text, Button, useModal } from "@advisable/donut";
import DeclineConsultationModal from "./DeclineConsultationModal";
import ACCEPT from "./acceptConsultation";

const PendingConsultation = ({ data }) => {
  const history = useHistory();
  const [acceptConsultation, acceptMutation] = useMutation(ACCEPT);
  const declineModal = useModal();
  const { id, topic, specialist, user } = data.consultation;

  const handleAccept = async () => {
    const response = await acceptConsultation({
      variables: { input: { consultation: id } },
    });

    const interview = response.data.acceptConsultation.interview;
    history.push(`/interview_request/${interview.airtableId}`);
  };

  return (
    <Card padding="xl">
      <DeclineConsultationModal
        modal={declineModal}
        consultation={data.consultation}
      />
      <Text
        mb="xs"
        as="h2"
        fontSize="xxl"
        color="blue800"
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
        What they&apos;d like to cover in a consultation:
      </Text>
      <Text lineHeight="s" color="neutral700" mb="xl">
        {topic}
      </Text>
      <Button mr="xs" onClick={handleAccept} loading={acceptMutation.loading}>
        Accept Request
      </Button>
      <Button
        variant="secondary"
        disabled={acceptMutation.loading}
        onClick={declineModal.show}
      >
        Decline Request
      </Button>
    </Card>
  );
};

export default PendingConsultation;
