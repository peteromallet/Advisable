import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { Text, Button, Stack } from "@advisable/donut";
import { ArrowRight } from "@styled-icons/feather";
import StarRatingField from "./StarRatingField";

function ReviewStars({ specialist }) {
  const { id } = useParams();
  const history = useHistory();
  const initialValues = {
    comment: "",
    skills: undefined,
    qualityOfWork: undefined,
    adherenceToSchedule: undefined,
    communication: undefined,
    availability: undefined,
    ...history.location.state,
  };

  // Redirect to the comment form
  const handleSubmit = async (values) => {
    history.push(`/verify_project/${id}/review/comment`, { ...values });
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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
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
            <Button
              size="l"
              mr="xs"
              mb={["xs", "none"]}
              width={["100%", "auto"]}
              suffix={<ArrowRight />}
            >
              Continue
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
