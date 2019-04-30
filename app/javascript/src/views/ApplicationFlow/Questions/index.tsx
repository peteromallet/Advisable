import { get, find } from "lodash";
import * as React from "react";
import { Redirect } from "react-router-dom";
import { Mutation } from "react-apollo";
import { Formik, Form } from "formik";
import { Heading, Padding, FieldRow, TextField } from "../../../components";
import { useScreenSize } from "../../../utilities/screenSizes";
import useScrollRestore from "../../../utilities/useScrollRestore";
import UPDATE_APPLICATION from "../updateApplication.graphql";
import validationSchema from "./validationSchema";
import Actions from "../Actions";

const Questions = ({
  application,
  match,
  history,
  steps,
  currentStep,
  location
}) => {
  const step = steps[currentStep];
  const isMobile = useScreenSize("small");
  const { applicationId } = match.params;
  const number = parseInt(match.params.number);
  useScrollRestore(null, [number]);
  const questions = get(application, "project.questions", []);
  const question = questions[number - 1];
  const applicationQuestion = find(application.questions, { question }) || {};
  const previousQuestion =
    find(application.questions, {
      question: questions[number - 2]
    }) || {};

  // if the step is hidden then redirect to the references step.
  if (step.hidden) {
    let referencesStep = {
      ...location,
      pathname: `/invites/${applicationId}/apply/references`
    };
    return <Redirect to={referencesStep} />;
  }

  // If the number is outside the range of number of questions then redirect to
  // the first questions as the URL is invalid
  if (!number || number > questions.length || number < 0) {
    let firstQuestion = {
      ...location,
      pathname: `/invites/${applicationId}/apply/questions/1`
    };
    return <Redirect to={firstQuestion} />;
  }

  // If the previous question has not been answered yet then redirect back to it.
  if (number > 1 && !previousQuestion.answer) {
    return (
      <Redirect
        to={{
          ...location,
          pathname: `/invites/${applicationId}/apply/questions/${number - 1}`
        }}
      />
    );
  }

  const goBack = formik => {
    let url: string;
    if (number > 1) {
      formik.resetForm();
      formik.setFieldValue("answer", previousQuestion.answer || "");
      url = `/invites/${applicationId}/apply/questions/${number - 1}`;
    } else {
      url = `/invites/${applicationId}/apply`;
    }

    history.replace({
      ...location,
      pathname: url
    });
  };

  const handleSubmit = updateApplication => {
    return async (values, formikBag) => {
      await updateApplication({
        variables: {
          input: {
            id: applicationId,
            questions: [
              {
                question,
                answer: values.answer
              }
            ]
          }
        }
      });

      formikBag.resetForm();
      const nextQuestion = application.questions[number] || {};
      formikBag.setFieldValue("answer", nextQuestion.answer || "");

      let url: string;
      if (number === questions.length) {
        url = `/invites/${applicationId}/apply/references`;
      } else {
        url = `/invites/${applicationId}/apply/questions/${number + 1}`;
      }

      history.push({
        ...location,
        pathname: url
      });
    };
  };

  return (
    <Mutation mutation={UPDATE_APPLICATION}>
      {updateApplication => (
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit(updateApplication)}
          initialValues={{ answer: applicationQuestion.answer || "" }}
        >
          {formik => (
            <Form>
              <Padding size={isMobile ? "l" : "xl"}>
                <Padding bottom="s">
                  <Heading level={1}>Application Questions</Heading>
                </Padding>
                <Padding bottom="l">
                  <Heading level={6}>
                    Question {number} of {questions.length}
                  </Heading>
                </Padding>
                <FieldRow>
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
                </FieldRow>
              </Padding>

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
      )}
    </Mutation>
  );
};

export default Questions;
