import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import isEmpty from "lodash/isEmpty";
// Hooks
import { useHistory, useParams, useLocation, Redirect } from "react-router-dom";
// Components
import {
  Card,
  Box,
  Heading,
  Text,
  Button,
  Stack,
  InputError,
} from "@advisable/donut";
import StarRatingField from "../components/StarRatingField";
import SubmitButton from "src/components/SubmitButton";

const validationSchema = Yup.object().shape({
  adherenceToSchedule: Yup.number().required(),
  availability: Yup.number().required(),
  communication: Yup.number().required(),
  qualityOfWork: Yup.number().required(),
  skills: Yup.number().required(),
});

function ReviewRatings({ data }) {
  const { specialist, oauthViewer } = data;

  // React Router data
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  // Describe Formik initial state
  const starRatingsPreserved = location.state?.starRatings;
  const initialValues = {
    skills: undefined,
    qualityOfWork: undefined,
    adherenceToSchedule: undefined,
    communication: undefined,
    availability: undefined,
    ...starRatingsPreserved,
  };

  // Trigger on continue button
  const handleContinue = (values) => {
    // Preserve Formik's state in the location state, to handle browser's back button
    history.replace(`/review/${id}/ratings`, { ratings: values });
    // Relocate to comment step and pass stars ratings there
    history.push(`/review/${id}/comment`, {
      ratings: values,
    });
  };

  // Trigger on skip button
  const handleSkip = () => {
    history.push(`/review/${id}/comment`);
  };

  if (!oauthViewer) {
    return <Redirect to={`/review/${specialist.id}`} />;
  }

  return (
    <Card padding={[6, 8]} borderRadius="16px">
      <Heading
        mb={3}
        fontSize={{ _: "24px", m: "30px" }}
        lineHeight={{ _: "28px", m: "32px" }}
        fontWeight={600}
        letterSpacing="-0.03em"
      >
        How was your experience working with {specialist.firstName} on this
        project?
      </Heading>
      <Text fontSize="lg" lineHeight="24px" color="neutral900" mb="40px">
        How would you rate them in the following areas?
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleContinue}
        validationSchema={validationSchema}
        validateOnChange={false}
      >
        {(formik) => (
          <Form>
            <Stack mb="m" spacing="m" divider="blue50">
              <StarRatingField label="Skills" name="skills" />
              <StarRatingField label="Quality of work" name="qualityOfWork" />
              <StarRatingField
                label="Adherence to schedule"
                name="adherenceToSchedule"
              />
              <StarRatingField label="Communication" name="communication" />
              <StarRatingField label="Availability" name="availability" />
            </Stack>
            {!isEmpty(formik.errors) && (
              <Box
                px="xs"
                py="xxs"
                display={["block", "inline-block"]}
                bg="red100"
                borderRadius={4}
              >
                <InputError>Rate all areas before continue, please.</InputError>
              </Box>
            )}
            <Box mt="xl">
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
                type="button"
                variant="subtle"
                mr="xs"
                mb={["xs", "none"]}
                width={["100%", "auto"]}
                onClick={handleSkip}
              >
                Skip
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default ReviewRatings;
