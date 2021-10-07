import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
// Hooks
import { useHistory, useParams, useLocation, Redirect } from "react-router-dom";
import { useReviewSpecialist } from "../queries";
// Components
import { Card, Text, Textarea, Select } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";

const valiadtionSchema = object().shape({
  companyName: string().required("Please provide your company name"),
  relationship: string().required("Please set the relationship status"),
  comment: string().required("Please write a review"),
});

function ReviewComment({ data }) {
  const { specialist, oauthViewer } = data;

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
    history.push(`/review/${specialist.id}/complete`, {
      review: response.data?.reviewSpecialist?.review,
    });
  };

  if (!oauthViewer) {
    return <Redirect to={`/review/${specialist.id}`} />;
  }

  return (
    <Card padding={["m", "l"]}>
      <Text
        mb={3}
        color="blue900"
        fontSize={{ _: "24px", m: "30px" }}
        lineHeight={{ _: "28px", m: "32px" }}
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        What did you love about working with {specialist.firstName}?
      </Text>
      <Text fontSize="16px" lineHeight="24px" color="neutral900" mb="l">
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
            <option>They worked on the project with me</option>
            <option>They worked at the company but not the project</option>
            <option>They managed the project</option>
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
