import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Card, Text } from "@advisable/donut";
import BookingTypeForm from "../../components/BookingTypeForm";
import START_WORKING from "./startWorking";

const BookingType = ({ data }) => {
  const history = useHistory();
  const [startWorking] = useMutation(START_WORKING);
  const firstName = data.application.specialist.firstName;

  const handleSubmit = async (values, formik) => {
    const id = data.application.airtableId;
    await startWorking({
      variables: {
        input: {
          ...values,
          application: id,
        },
      },
    });

    history.push(`/manage/${id}`);
  };

  return (
    <Card p="l">
      <Text
        mb="l"
        fontSize="xxl"
        color="neutral.8"
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
