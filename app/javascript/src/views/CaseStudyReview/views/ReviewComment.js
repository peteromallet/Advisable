import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
// Hooks
import {
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useNotifications } from "src/components/Notifications";
import { useCreateReview } from "../queries";
// Components
import { Card, Text, Heading, Textarea } from "@advisable/donut";
import SubmitButton from "src/components/SubmitButton";
import FormField from "src/components/FormField";
import Reviewed from "./Reviewed";

const valiadtionSchema = object().shape({
  comment: string().required("Please write a review"),
});

function ReviewComment({ data }) {
  const { specialist, oauthViewer } = data;
  const { error } = useNotifications();

  // React Router data
  const { article_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Apollo Mutation action
  const [createReview] = useCreateReview();

  // Describe Formik initial state
  const initialValues = { comment: "" };

  const handleSubmit = async (values) => {
    const response = await createReview({
      variables: {
        input: {
          article: article_id,
          ratings: location.state?.ratings,
          ...values,
        },
      },
    });

    if (response.errors) {
      error("Something went wrong. Please try again.");
    } else {
      navigate(`/review/${specialist.id}/case_studies/${article_id}/complete`);
    }
  };

  if (data.caseStudy.review) {
    return <Reviewed />;
  }
  if (!oauthViewer) {
    return (
      <Navigate
        replace
        to={`/review/${specialist.id}/case_studies/${article_id}`}
      />
    );
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
