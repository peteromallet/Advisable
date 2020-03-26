import { find } from "lodash";
import * as React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import { Box, Text } from "@advisable/donut";
import { TextField } from "../../../components";
import useScrollRestore from "../../../utilities/useScrollRestore";
import UPDATE_APPLICATION from "../updateApplication";
import validationSchema from "./validationSchema";
import Actions from "../Actions";

const Questions = ({
  application,
  match,
  history,
  steps,
  currentStep,
  location,
}) => {
  const [updateApplication] = useMutation(UPDATE_APPLICATION);
  const step = steps[currentStep];
  const { applicationId } = match.params;
  const number = parseInt(match.params.number);
  useScrollRestore(null, [number]);
  const questions = application.project.questions || [];
  const question = questions[number - 1];
  const applicationQuestion = find(application.questions, { question }) || {};
  const previousQuestion =
    find(application.questions, {
      question: questions[number - 2],
    }) || {};

  // if the step is hidden then redirect to the references step.
  if (step.hidden) {
    let referencesStep = {
      ...location,
      pathname: `/invites/${applicationId}/apply/references`,
    };
    return <Redirect to={referencesStep} />;
  }

  // If the number is outside the range of number of questions then redirect to
  // the first questions as the URL is invalid
  if (!number || number > questions.length || number < 0) {
    let firstQuestion = {
      ...location,
      pathname: `/invites/${applicationId}/apply/questions/1`,
    };
    return <Redirect to={firstQuestion} />;
  }

  // If the previous question has not been answered yet then redirect back to it.
  if (number > 1 && !previousQuestion.answer) {
    return (
      <Redirect
        to={{
          ...location,
          pathname: `/invites/${applicationId}/apply/questions/${number - 1}`,
        }}
      />
    );
  }

  const goBack = (formik) => {
    let url;
    if (number > 1) {
      formik.resetForm();
      formik.setFieldValue("answer", previousQuestion.answer || "");
      url = `/invites/${applicationId}/apply/questions/${number - 1}`;
    } else {
      url = `/invites/${applicationId}/apply`;
    }

    history.replace({
      ...location,
      pathname: url,
    });
  };

  const handleSubmit = async (values, formikBag) => {
    await updateApplication({
      variables: {
        input: {
          id: applicationId,
          questions: [
            {
              question,
              answer: values.answer,
            },
          ],
        },
      },
    });

    formikBag.resetForm();
    const nextQuestion = application.questions[number] || {};
    formikBag.setFieldValue("answer", nextQuestion.answer || "");

    let url;
    if (number === questions.length) {
      url = `/invites/${applicationId}/apply/references`;
    } else {
      url = `/invites/${applicationId}/apply/questions/${number + 1}`;
    }

    history.push({ ...location, pathname: url });
  };

  const initialValues = {
    answer: applicationQuestion.answer || "",
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <Box padding={{ _: "l", m: "xl " }}>
            <Text
              mb="s"
              as="h1"
              fontSize="30px"
              color="blue.9"
              fontWeight="semibold"
              letterSpacing="-0.03em"
            >
              Application Questions
            </Text>
            <Text
              mb="l"
              as="h6"
              fontSize="xxs"
              color="neutral.7"
              fontWeight="semibold"
              style={{ textTransform: "uppercase" }}
            >
              Question {number} of {questions.length}
            </Text>
            <Box mb="m">
              <TextField
                multiline
                autoHeight
                minRows={10}
                name="answer"
                label={question}
                placeholder={question}
                onBlur={formik.handleBlur}
                value={formik.values.answer}
                onChange={formik.handleChange}
                error={formik.touched.answer && formik.errors.answer}
              />
            </Box>
          </Box>

          <Actions
            steps={steps}
            currentStep={currentStep}
            application={application}
            onBack={() => goBack(formik)}
            isSubmitting={formik.isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Questions;
