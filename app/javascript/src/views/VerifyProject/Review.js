import React from "react";
import { Formik, Form, useField } from "formik";
import { useHistory } from "react-router-dom";
import {
  Container,
  Card,
  Text,
  Button,
  Textarea,
  Box,
  Stack,
} from "@advisable/donut";
import FormField from "../../components/FormField";
import StarRatingInput from "../../components/StarRatingInput";
import SubmitButton from "../../components/SubmitButton";
import { useReviewPreviousProject } from "./queries";

function Review({ data }) {
  const history = useHistory();
  const { id, specialist } = data.previousProject;
  const [reviewPreviousProject] = useReviewPreviousProject();

  const initialValues = {
    comment: "",
    skills: undefined,
    qualityOfWork: undefined,
    adherenceToSchedule: undefined,
    communication: undefined,
    availability: undefined,
  };

  const handleSubmit = async (values) => {
    await reviewPreviousProject({
      variables: {
        input: {
          previousProject: id,
          ...values,
        },
      },
    });

    history.push(`/verify_project/${id}/validated`);
  };

  const handleSkip = () => {
    history.push(`/verify_project/${id}/validated`);
  };

  return (
    <Container maxWidth="700px">
      <Card padding="l">
        <Text
          mb="12px"
          color="blue900"
          fontSize="28px"
          lineHeight="32px"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          How was your experience working with {specialist.firstName} on this
          project?
        </Text>
        <Text fontSize="17px" lineHeight="24px" color="neutral700" mb="40px">
          Tell us what it was like to work with {specialist.firstName}. How
          would you rate them in the following areas?
        </Text>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              <Stack mb="50px" spacing="m" divider="blue50">
                <StarRatingField label="Skills" name="skills" />
                <StarRatingField label="Quality of work" name="qualityOfWork" />
                <StarRatingField
                  label="Adherence to schedule"
                  name="adherenceToSchedule"
                />
                <StarRatingField label="Communication" name="communication" />
                <StarRatingField label="Availability" name="availability" />
              </Stack>
              <FormField
                mb="l"
                minRows={4}
                as={Textarea}
                name="comment"
                label="Anything else you would like to add?"
                placeholder="Comment"
              />
              <SubmitButton size="l" mr="xs">
                Continue
              </SubmitButton>
              <Button
                size="l"
                variant="subtle"
                onClick={formik.dirty ? handleSubmit : handleSkip}
              >
                Skip
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}

function StarRatingField({ name, label }) {
  const [field, _, helpers] = useField(name);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Text color="blue900" fontWeight="medium">
        {label}
      </Text>
      <Box>
        <StarRatingInput
          name={name}
          value={field.value}
          onChange={(rating) => helpers.setValue(rating)}
        />
      </Box>
    </Box>
  );
}

export default Review;
