import React from "react";
import { Formik, Form, useField } from "formik";
import { Link, useHistory } from "react-router-dom";
import { Text, Button, Textarea, Box } from "@advisable/donut";
import FormField from "../../components/FormField";
import StarRatingInput from "../../components/StarRatingInput";
import SubmitButton from "../../components/SubmitButton";
import { useReviewPreviousProject } from "./queries";

function Review({ data }) {
  const history = useHistory();
  const { id, specialist } = data.previousProject;
  const [reviewPreviousProject] = useReviewPreviousProject();

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

    history.push(`/verify_project/${id}/validated`);
  };

  return (
    <>
      <Text
        mb="l"
        color="blue900"
        fontSize="24px"
        lineHeight="26px"
        fontWeight="semibold"
      >
        How was your experience working with {specialist.firstName}?
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Text fontSize="l" fontWeight="medium">
            How would you rate {specialist.firstName} in the following areas
          </Text>
          <Box mb="l">
            <StarRatingField label="Skills" name="skills" />
            <StarRatingField label="Quality of work" name="qualityOfWork" />
            <StarRatingField
              label="Adherence to schedule"
              name="adherenceToSchedule"
            />
            <StarRatingField label="Communication" name="communication" />
            <StarRatingField label="Availability" name="availability" />
          </Box>
          <FormField
            mb="l"
            as={Textarea}
            name="comment"
            label="Anythning else you would like to add?"
          />
          <SubmitButton size="l" mr="xs">
            Continue
          </SubmitButton>
          <Link to={`/verify_project/${id}/validated`}>
            <Button size="l" variant="subtle">
              Skip
            </Button>
          </Link>
        </Form>
      </Formik>
    </>
  );
}

function StarRatingField({ name, label }) {
  const [field, _, helpers] = useField(name);

  return (
    <Box
      pt="xs"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>{label}</Box>
      <Box>
        <StarRatingInput
          name={name}
          value={field.value}
          onChange={(rating) => helpers.setValue(rating)}
        />
      </Box>
    </Box>
  );
}

export default Review;
