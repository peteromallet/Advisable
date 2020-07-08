import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { Text, Button, Textarea } from "@advisable/donut";
import FormField from "../../../components/FormField";
import SubmitButton from "../../../components/SubmitButton";
import { useReviewPreviousProject } from "../queries";

function ReviewComment({ specialist }) {
  const { id } = useParams();
  const [reviewPreviousProject] = useReviewPreviousProject();
  const history = useHistory();

  const handleBack = (values) => async () => {
    history.push(`/verify_project/${id}/review`, { ...values });
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
        What did you LOVE about working with {specialist.firstName}?
      </Text>
      <Text fontSize="16px" lineHeight="24px" color="neutral900" mb="l">
        Your story might be excited for our users and could open vast
        opportunities for {specialist.firstName} and even for you.
      </Text>
      <Formik
        initialValues={{ ...history.location.state }}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <FormField
              mb="l"
              minRows={8}
              as={Textarea}
              name="comment"
              placeholder={`E.g. ${specialist.firstName} is an incredible...`}
            />
            <SubmitButton
              size="l"
              mr="xs"
              mb={["xs", "none"]}
              width={["100%", "auto"]}
            >
              Submit Review
            </SubmitButton>
            <Button
              size="l"
              variant="subtle"
              width={["100%", "auto"]}
              onClick={handleBack(formik.values)}
            >
              Back
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

ReviewComment.propTypes = {
  specialist: PropTypes.object.isRequired,
};

export default ReviewComment;
