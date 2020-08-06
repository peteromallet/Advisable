import React from "react";
import { Formik, Form } from "formik";
import { DateTime } from "luxon";
import { useParams, useLocation } from "react-router-dom";
import { ArrowLeft } from "@styled-icons/feather";
import { useMutation } from "@apollo/client";
import { Text, Box, Link } from "@advisable/donut";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import { ACCEPT_INTERVIEW_REQUEST } from "./queries";
import Event from "./Event";

export default function ConfirmInterviewRequest({ interview }) {
  const location = useLocation();
  const { datetime, interviewID } = useParams();
  const parsed = DateTime.fromISO(datetime);
  const [acceptInterviewRequest] = useMutation(ACCEPT_INTERVIEW_REQUEST);

  const handleSubmit = async (values) => {
    await acceptInterviewRequest({
      variables: {
        input: { ...values, id: interviewID },
      },
    });
  };

  const clientName = interview.user.companyName;

  const initialValues = {
    startsAt: parsed.toUTC().toISO(),
    phoneNumber: interview.application.specialist.phoneNumber || "",
  };

  return (
    <>
      <Link
        mb="xs"
        to={`/interview_request/${interviewID}/${parsed.toFormat(
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
        <Event date={parsed} zone={location.state?.zone} />
      </Box>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <FormField
            autoFocus
            name="phoneNumber"
            marginBottom="xl"
            placeholder="(000)-000-0000"
            label="Your contact number"
          />
          <SubmitButton size="l">Confirm Call</SubmitButton>
        </Form>
      </Formik>
    </>
  );
}
