import React from "react";
import { Formik, Form, useField } from "formik";
import { useHistory, Redirect } from "react-router-dom";
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
import useScrollToTop from "../../hooks/useScrollToTop";

function Review({ data }) {
  useScrollToTop;
  const history = useHistory();
  const { id, specialist, reviews } = data.previousProject;
  const [reviewPreviousProject] = useReviewPreviousProject();

  if (reviews.length > 0) {
    return <Redirect to={`/verify_project/${id}/complete`} />;
  }

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

    history.push(`/verify_project/${id}/complete`);
  };

  const handleSkip = () => {
    history.push(`/verify_project/${id}/complete`);
  };

  return (
    <Container maxWidth="700px" pb="20px">
      <Card padding={["m", "l"]}>
        <Text
          mb="12px"
          color="blue900"
          fontSize={{ _: "24px", m: "30px" }}
          lineHeight={{ _: "28px", m: "32px" }}
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          How was your experience working with {specialist.firstName} on this
          project?
        </Text>
        <Text fontSize="16px" lineHeight="24px" color="neutral900" mb="40px">
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
              <SubmitButton
                size="l"
                mr="xs"
                mb={["xs", "none"]}
                width={["100%", "auto"]}
              >
                Continue
              </SubmitButton>
              <Button
                size="l"
                variant="subtle"
                width={["100%", "auto"]}
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
          label={label}
          onChange={(rating) => helpers.setValue(rating)}
        />
      </Box>
    </Box>
  );
}

export default Review;
