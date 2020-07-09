import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
// Hooks
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useReviewPreviousProject } from "../queries";
// Components
import { Text, Button, Stack } from "@advisable/donut";
import StarRatingField from "./StarRatingField";
import SubmitButton from "../../../components/SubmitButton";

function ReviewStars({ specialist }) {
  // React Router data
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  // Apollo Mutation action
  const [reviewPreviousProject] = useReviewPreviousProject();

  // Describe Formik initial state
  const starRatingPreserved = location.state && location.state.starRatings;
  const initialValues = {
    skills: undefined,
    qualityOfWork: undefined,
    adherenceToSchedule: undefined,
    communication: undefined,
    availability: undefined,
    ...starRatingPreserved,
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
  const handleSkip = (dirty, values) => async () => {
    dirty &&
      (await reviewPreviousProject({
        variables: { input: { previousProject: id, ...values } },
      }));
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
      <Formik initialValues={initialValues} onSubmit={handleContinue}>
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
              onClick={handleSkip(formik.dirty, formik.values)}
            >
              Skip
            </Button>
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
