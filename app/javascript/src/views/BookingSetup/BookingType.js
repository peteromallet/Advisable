import React from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Card, Text } from "@advisable/donut";
import { useNotifications } from "src/components/Notifications";
import BookingTypeForm from "../../components/BookingTypeForm";
import START_WORKING from "./startWorking";
import dataLayer from "../../utilities/dataLayer";

const BookingType = ({ data }) => {
  const history = useHistory();
  const { error } = useNotifications();
  const [startWorking] = useMutation(START_WORKING);
  const firstName = data.application.specialist.firstName;

  const handleSubmit = async (values) => {
    const id = data.application.id;
    const { errors } = await startWorking({
      variables: {
        input: {
          ...values,
          application: id,
        },
      },
    });

    if (errors) {
      error("Something went wrong, please try again.");
      return;
    }

    dataLayer.push({
      event: "hiredFreelancer",
      projectId: data.application.project.id,
      applicationId: id,
    });

    history.push(`/manage/${id}`);
  };

  return (
    <Card padding={8} borderRadius="12px">
      <Text
        mb={1}
        fontSize="4xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.04em"
      >
        Project type
      </Text>
      <Text mb={6}>How would you like to work with {firstName}?</Text>
      <BookingTypeForm
        firstName={firstName}
        onSubmit={handleSubmit}
        hourlyRate={data.application.invoiceRate}
      />
    </Card>
  );
};

export default BookingType;
