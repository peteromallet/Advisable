import React from "react";
import { Formik } from "formik";
import { DateTime } from "luxon";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "@styled-icons/feather";
import { useMutation } from "@apollo/react-hooks";
import { Text, Box, Link, Button } from "@advisable/donut";
import TextField from "../../components/TextField";
import ACCEPT_INTERVIEW_REQUEST from "./acceptInterviewRequest";
import Event from "./Event";

export default function ConfirmInterviewRequest({
  match,
  phoneNumber,
  clientName,
}) {
  const { datetime } = useParams();
  const parsed = DateTime.fromISO(datetime);
  const [acceptInterviewRequest] = useMutation(ACCEPT_INTERVIEW_REQUEST);

  const handleSubmit = async (values) => {
    await acceptInterviewRequest({
      variables: {
        input: { ...values, id: match.params.interviewID },
      },
    });
  };

  const initialValues = {
    startsAt: parsed.toUTC().toISO(),
    phoneNumber,
  };

  return (
    <>
      <Link
        mb="xs"
        to={`/interview_request/${match.params.interviewID}/${parsed.toFormat(
          "yyyy-MM-dd",
        )}`}
      >
        <Box display="inline-block" mr="xxs">
          <ArrowLeft size={16} strokeWidth={2} />
        </Box>
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
            <Button
              size="l"
              loading={form.isSubmitting}
              disabled={form.isSubmitting}
              type="submit"
            >
              Confirm Call
            </Button>
          </form>
        )}
      />
    </>
  );
}
