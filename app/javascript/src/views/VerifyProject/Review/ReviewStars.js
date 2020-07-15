import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { isEmpty } from "lodash-es";
// Hooks
import { useHistory, useParams, useLocation } from "react-router-dom";
// Components
import { Box, Text, Button, Stack, InputError } from "@advisable/donut";
import StarRatingField from "./StarRatingField";
import SubmitButton from "../../../components/SubmitButton";

// Formik validation Yup schema
const reviewStarsValidationSchema = Yup.object().shape({
  adherenceToSchedule: Yup.number().required(),
  availability: Yup.number().required(),
  communication: Yup.number().required(),
  qualityOfWork: Yup.number().required(),
  skills: Yup.number().required(),
});

function ReviewStars({ specialist }) {
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
    history.replace(`/verify_project/${id}/review`, { starRatings: values });
    // Relocate to comment step and pass stars ratings there
    history.push(`/verify_project/${id}/review/comment`, {
      starRatings: values,
    });
  };

  // Trigger on skip button
  const handleSkip = async () => {
    history.push(`/verify_project/${id}/complete`);
  };

  return (
    <>
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
        How would you rate them in the following areas?
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleContinue}
        validationSchema={reviewStarsValidationSchema}
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
    </>
  );
}

ReviewStars.propTypes = {
  specialist: PropTypes.object.isRequired,
};

export default ReviewStars;
