import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Text,
  Label,
  Button,
  Textarea,
  RadioGroup,
} from "@advisable/donut";
import Loading from "src/components/Loading";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { Trash } from "@styled-icons/ionicons-solid";
import Selection from "./Selection";
import { useRejectApplication, useApplication } from "./queries";

const OTHER = "__OTHER";

const PRE_INTERVIEW_REASONS = [
  "The application is too general",
  "Answers don't demonstrate the experience I'm looking for",
  "There aren't enough relevant projects that demonstrate their previous work",
];

const POST_INTERVIEW_REASONS = [
  "They didn't communicate their expertise well in the interview",
  "They don't seem to be a good fit for this project",
  "Their pricing expectations aren't in line with our budget",
  "They don't seem like a perfect culture fit",
];

function Reason({ data, formik, onNext, onCancel }) {
  const firstName = data?.application?.specialist?.firstName;
  const interviewStatus = data?.application?.interview?.status;
  const postInterview = interviewStatus === "Call Completed";
  const reasons = postInterview
    ? POST_INTERVIEW_REASONS
    : PRE_INTERVIEW_REASONS;

  const handleReasonChange = (formik) => (e) => {
    if (e.target.value === OTHER) {
      formik.setFieldValue("reason", "");
    } else {
      formik.setFieldValue("otherReason", "");
    }

    formik.handleChange(e);
  };

  return (
    <>
      <Label mb={1}>What feedback do you have for {firstName}?</Label>
      <Text fontSize="xs" color="neutral700" lineHeight="1.3" mb={4}>
        This feedback will be shared with {firstName} to help them improve their
        future applications.
      </Text>
      <RadioGroup>
        {reasons.map((reason) => (
          <Box mb={2} key={reason}>
            <Field
              as={Selection}
              type="radio"
              name="reason"
              value={reason}
              onChange={handleReasonChange(formik)}
            >
              <Text fontSize={["s", "m"]} color="neutral800" lineHeight="1.2">
                {reason}
              </Text>
            </Field>
          </Box>
        ))}
        <Field
          as={Selection}
          type="radio"
          name="reason"
          value={OTHER}
          onChange={handleReasonChange(formik)}
        >
          <Text color="neutral800" lineHeight="1.2">
            Other
          </Text>
        </Field>
      </RadioGroup>
      {formik.values.reason === OTHER && (
        <>
          <FormField
            autoFocus
            as={Textarea}
            name="otherReason"
            minRows={2}
            marginTop={2}
            marginBottom={2}
            placeholder="Feedback"
          />
        </>
      )}
      <Box marginTop={8}>
        <Button
          variant="dark"
          marginRight={3}
          onClick={onNext}
          disabled={!formik.values.reason}
        >
          Continue
        </Button>
        <Button type="button" variant="subtle" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </>
  );
}

function Feedback({ data, onCancel }) {
  const firstName = data?.application?.specialist?.firstName;
  return (
    <>
      <FormField
        autoFocus
        minRows={5}
        as={Textarea}
        name="feedback"
        marginBottom={2}
        label="What feedback do you have for us, to help us you find a better candidate?"
      />
      <Text fontSize="xs" color="neutral700" lineHeight="1.3" mb={6}>
        Please be as honest as possible.{" "}
        <b>This won&apos;t be shared with {firstName}</b> and will be used by us
        to propose you a better candidate.
      </Text>
      <SubmitButton prefix={<Trash />} variant="dark" marginRight={3}>
        Reject
      </SubmitButton>
      <Button type="button" variant="subtle" onClick={onCancel}>
        Cancel
      </Button>
    </>
  );
}

export default function RejectApplicationForm({
  id,
  onReject = () => {},
  onCancel = () => {},
  mutationOptions,
}) {
  const [step, setStep] = useState("REASON");
  const { loading, data } = useApplication({ variables: { id } });
  const [rejectApplication] = useRejectApplication(mutationOptions);

  const handleSubmit = async (values, formik) => {
    const response = await rejectApplication({
      variables: {
        input: {
          id,
          reason: values.otherReason || values.reason,
          feedback: values.feedback,
        },
      },
    });

    if (response.errors) {
      formik.resetForm();
    } else {
      onReject(response);
    }
  };

  const initialValues = {
    reason: "",
    otherReason: "",
    feedback: "",
  };

  const firstName = data?.application?.specialist?.firstName;

  if (loading) return <Loading />;

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {(formik) => (
        <Form>
          <Text
            fontSize="4xl"
            marginBottom={1}
            color="neutral900"
            fontWeight="medium"
            letterSpacing="-0.02em"
          >
            Reject {firstName}
          </Text>
          <Text
            color="neutral700"
            fontSize="l"
            lineHeight="1.2"
            marginBottom={6}
          >
            Please provide feedback to help us find you a better candidate.
          </Text>

          {step === "REASON" && (
            <Reason
              data={data}
              formik={formik}
              onNext={() => setStep("FEEDBACK")}
              onCancel={onCancel}
            />
          )}
          {step === "FEEDBACK" && (
            <Feedback data={data} formik={formik} onCancel={onCancel} />
          )}
        </Form>
      )}
    </Formik>
  );
}
