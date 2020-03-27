import React from "react";
import { Formik } from "formik";
import moment from "moment-timezone";
import { useMutation } from "@apollo/react-hooks";
import { Text, Box, Link, Icon, RoundedButton } from "@advisable/donut";
import TextField from "src/components/TextField";
import ACCEPT_INTERVIEW_REQUEST from "./acceptInterviewRequest";
// import { Event } from "./styles";
import Event from "./Event";

export default function ConfirmInterviewRequest({
  match,
  phoneNumber,
  clientName,
}) {
  const parsed = moment.parseZone(match.params.datetime);
  const [acceptInterviewRequest] = useMutation(ACCEPT_INTERVIEW_REQUEST);

  const handleSubmit = async (values) => {
    await acceptInterviewRequest({
      variables: {
        input: { ...values, id: match.params.interviewID },
      },
    });
  };

  const initialValues = {
    startsAt: parsed.toISOString(),
    phoneNumber,
  };

  return (
    <>
      <Link
        mb="xs"
        to={`/interview_request/${match.params.interviewID}/${parsed.format(
          "YYYY-MM-DD",
        )}`}
      >
        <Icon icon="arrow-left" width={16} mr="xxs" />
        Back
      </Link>
      <Text
        as="h1"
        mb="xs"
        fontSize="xxl"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        Contact Information
      </Text>
      <Text lineHeight="s" color="neutral800" mb="m">
        Enter & confirm your contact information below. This will be shared with{" "}
        {clientName}
      </Text>
      <Box mb="m">
        <Event date={parsed} />
      </Box>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        render={(form) => (
          <form onSubmit={form.handleSubmit}>
            <TextField
              autoFocus
              name="phoneNumber"
              marginBottom="xl"
              placeholder="(000)-000-0000"
              label="Your contact number"
              value={form.values.phoneNumber}
              onChange={form.handleChange}
            />
            <RoundedButton
              size="l"
              loading={form.isSubmitting}
              disabled={form.isSubmitting}
              type="submit"
            >
              Confirm Call
            </RoundedButton>
          </form>
        )}
      />
    </>
  );
}
