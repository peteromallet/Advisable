import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
// Hooks
import { useHistory, useParams, useLocation, Redirect } from "react-router-dom";
import { useNotifications } from "src/components/Notifications";
import { useReviewSpecialist } from "../queries";
// Components
import { Card, Text, Heading, Textarea, Select } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";

const valiadtionSchema = object().shape({
  companyName: string().required("Please provide your company name"),
  relationship: string().required("Please set the relationship status"),
  comment: string().required("Please write a review"),
});

function ReviewComment({ data }) {
  const { specialist, oauthViewer } = data;
  const { error } = useNotifications();

  // React Router data
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  // Apollo Mutation action
  const [reviewSpecialist] = useReviewSpecialist();

  // Describe Formik initial state
  const initialValues = { companyName: "", relationship: "", comment: "" };

  const handleSubmit = async (values) => {
    const response = await reviewSpecialist({
      variables: {
        input: {
          specialist: id,
          ratings: location.state?.ratings,
          ...values,
        },
      },
    });

    if (response.error) {
      error("Something went wrong. Please try again.");
    } else {
      history.push(`/review/${specialist.id}/complete`, {
        review: response.data?.reviewSpecialist?.review,
      });
    }
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
        What did you love about working with {specialist.firstName}?
      </Heading>
      <Text fontSize="lg" lineHeight="24px" color="neutral900" mb={6}>
        This will help {specialist.firstName} find new opportunities on
        Advisable.
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={valiadtionSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField
            marginBottom={6}
            name="companyName"
            label={`What company did you work with ${specialist.firstName} at?`}
            placeholder="Company name"
          />
          <FormField
            as={Select}
            marginBottom={6}
            name="relationship"
            label="What was your relationship to them?"
          >
            <option value="They worked on the project with me">
              I worked on the project with them
            </option>
            <option value="They worked at the company but not the project">
              I worked at the company but not on the project
            </option>
            <option value="They managed the project">
              I managed the project
            </option>
          </FormField>
          <FormField
            minRows={8}
            as={Textarea}
            name="comment"
            marginBottom={6}
            placeholder={`E.g. ${specialist.firstName} is an incredible...`}
            label={`What did you love about working with ${specialist.firstName}?`}
          />
          <SubmitButton
            size="l"
            mr={2}
            mb={[2, "none"]}
            width={["100%", "auto"]}
          >
            Submit Review
          </SubmitButton>
        </Form>
      </Formik>
    </Card>
  );
}

export default ReviewComment;
