import React from "react";
import { Formik, Form } from "formik";
import { Text, Select, Button, Textarea } from "@advisable/donut";
import Loading from "src/components/Loading";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { Trash } from "@styled-icons/ionicons-solid";
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

export default function RejectApplicationForm({
  id,
  onReject = () => {},
  onCancel = () => {},
  mutationOptions,
}) {
  const { loading, data } = useApplication({ variables: { id } });
  const [rejectApplication] = useRejectApplication(mutationOptions);

  const handleSubmit = async (values, formik) => {
    console.log(values);
    const response = await rejectApplication({
      variables: {
        input: {
          id,
          reason: values.otherReason || values.reason,
          feedback: values.feedback,
        },
      },
    });

    if (!response.errors) {
      formik.resetForm();
    }

    onReject(response);
  };

  const initialValues = {
    reason: "",
    otherReason: "",
    feedback: "",
  };

  const firstName = data?.application?.specialist?.firstName;
  const interviewStatus = data?.application?.interview?.status;
  const postInterview = interviewStatus === "Call Completed";

  const handleReasonChange = (formik) => (e) => {
    if (e.target.value === OTHER) {
      formik.setFieldValue("reason", "");
    } else {
      formik.setFieldValue("otherReason", "");
    }

    formik.handleChange(e);
  };

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
          <FormField
            as={Select}
            placeholder="Select reason"
            label={`What feedback do you have for ${firstName}?`}
            marginBottom="xs"
            name="reason"
            onChange={handleReasonChange(formik)}
          >
            {(postInterview
              ? POST_INTERVIEW_REASONS
              : PRE_INTERVIEW_REASONS
            ).map((o) => (
              <option key={o}>{o}</option>
            ))}
            <option value={OTHER}>Other</option>
          </FormField>
          {formik.values.reason === OTHER && (
            <FormField
              autoFocus
              as={Textarea}
              name="otherReason"
              minRows={2}
              marginBottom={2}
              placeholder=""
            />
          )}
          <Text fontSize="xs" color="neutral700" lineHeight="1.3" mb={6}>
            This feedback will be shared with {firstName} to help them improve
            their future applications.
          </Text>
          <FormField
            minRows={5}
            as={Textarea}
            marginBottom={2}
            label="What feedback do you have for us, to help us you find a better candidate?"
            name="feedback"
          />
          <Text fontSize="xs" color="neutral700" lineHeight="1.3" mb={6}>
            Please be as honest as possible.{" "}
            <b>This won&apos;t be shared with {firstName}</b> and will be used
            by us to propose you a better candidate.
          </Text>
          <SubmitButton prefix={<Trash />} variant="dark" marginRight="12px">
            Reject
          </SubmitButton>
          <Button type="button" variant="subtle" onClick={onCancel}>
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
}
