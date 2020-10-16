import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Card, Text } from "@advisable/donut";
import BookingTypeForm from "../../components/BookingTypeForm";
import START_WORKING from "./startWorking";
import dataLayer from "../../utilities/dataLayer";

const BookingType = ({ data }) => {
  const history = useHistory();
  const [startWorking] = useMutation(START_WORKING);
  const firstName = data.application.specialist.firstName;

  const handleSubmit = async (values) => {
    const id = data.application.airtableId;
    await startWorking({
      variables: {
        input: {
          ...values,
          application: id,
        },
      },
    });

    dataLayer.push({
      event: "hiredFreelancer",
      projectId: data.application.project.id,
      applicationId: id,
    });

    history.push(`/manage/${id}`);
  };

  return (
    <Card p="l">
      <Text
        mb="l"
        fontSize="xxl"
        color="neutral800"
        fontWeight="bold"
        letterSpacing="-0.02em"
      >
        How do you want to work with {firstName}?
      </Text>
      <BookingTypeForm
        firstName={firstName}
        onSubmit={handleSubmit}
        hourlyRate={data.application.rate}
      />
    </Card>
  );
};

export default BookingType;
