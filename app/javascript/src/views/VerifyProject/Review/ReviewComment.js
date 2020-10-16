import PropTypes from "prop-types";
import { Formik, Form } from "formik";
// Hooks
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useReviewPreviousProject } from "../queries";
// Components
import { Text, Button, Textarea } from "@advisable/donut";
import FormField from "../../../components/FormField";
import SubmitButton from "../../../components/SubmitButton";

function ReviewComment({ specialist }) {
  // React Router data
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  // Apollo Mutation action
  const [reviewPreviousProject] = useReviewPreviousProject();

  // Describe Formik initial state
  const initialValues = { comment: "" };

  const handleSubmit = async (values) => {
    const starRatings = location.state?.starRatings;
    await reviewPreviousProject({
      variables: {
        input: {
          previousProject: id,
          ...starRatings,
          ...values,
        },
      },
    });
    history.push(`/verify_project/${id}/complete`);
  };

  const handleSkip = () => handleSubmit(initialValues);

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
        What did you love about working with {specialist.firstName}?
      </Text>
      <Text fontSize="16px" lineHeight="24px" color="neutral900" mb="l">
        This will help {specialist.firstName} find new opportunities on
        Advisable.
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <FormField
            minRows={8}
            as={Textarea}
            name="comment"
            marginBottom="l"
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
            type="button"
            variant="subtle"
            width={["100%", "auto"]}
            onClick={handleSkip}
          >
            Skip
          </Button>
        </Form>
      </Formik>
    </>
  );
}

ReviewComment.propTypes = {
  specialist: PropTypes.object.isRequired,
};

export default ReviewComment;
