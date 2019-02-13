import * as React from "react";
import { Redirect } from "react-router-dom";
import { Mutation } from "react-apollo";
import { Formik, Form } from "formik";
import {
  Flex,
  Button,
  Heading,
  Padding,
  Divider,
  FieldRow,
  TextField,
  BottomBar,
  ButtonGroup
} from "../../../components";
import StepDots from "../../../components/StepDots";
import { useScreenSize } from "../../../utilities/screenSizes";
import UPDATE_APPLICATION from "../updateApplication.graphql";
import validationSchema from "./validationSchema";

const Questions = ({ application, match, history, steps, currentStep }) => {
  const isMobile = useScreenSize("small");
  const { applicationId } = match.params;
  const number = parseInt(match.params.number);
  const applicationQuestion = application.questions[number - 1] || {};

  if (!match.params.number) {
    return <Redirect to={`/invites/${applicationId}/apply/questions/1`} />;
  }

  const goBack = formik => {
    let url: string;
    if (number > 1) {
      formik.resetForm();
      const previousQuestion = application.questions[number - 2] || {};
      formik.setFieldValue("answer", previousQuestion.answer || "");
      url = `/invites/${applicationId}/apply/questions/${number - 1}`;
    } else {
      url = `/invites/${applicationId}/apply`;
    }
    history.replace(url);
  };

  const handleSubmit = updateApplication => {
    return async (values, formikBag) => {
      await updateApplication({
        variables: {
          input: {
            id: applicationId,
            questions: [
              {
                question: applicationQuestion.question,
                answer: values.answer
              }
            ]
          }
        }
      });

      formikBag.resetForm();
      const nextQuestion = application.questions[number] || {};
      formikBag.setFieldValue("answer", nextQuestion.answer || "");

      if (number === application.questions.length) {
        history.push(`/invites/${applicationId}/apply/references`);
      } else {
        history.push(`/invites/${applicationId}/apply/questions/${number + 1}`);
      }
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
                    Question {number} of {application.questions.length}
                  </Heading>
                </Padding>
                <FieldRow>
                  <TextField
                    multiline
                    autoHeight
                    minRows={8}
                    name="answer"
                    maxLength={400}
                    onBlur={formik.handleBlur}
                    value={formik.values.answer}
                    onChange={formik.handleChange}
                    label={applicationQuestion.question}
                    placeholder={applicationQuestion.question}
                    error={formik.touched.answer && formik.errors.answer}
                  />
                </FieldRow>
              </Padding>

              {!isMobile && (
                <React.Fragment>
                  <Divider />
                  <Padding size="xl">
                    <Button
                      loading={formik.isSubmitting}
                      styling="green"
                      size="l"
                    >
                      Next
                    </Button>
                  </Padding>
                </React.Fragment>
              )}

              {isMobile && (
                <BottomBar>
                  <Padding bottom="m">
                    <Flex align="center" distribute="center">
                      <StepDots
                        total={steps.length}
                        current={currentStep + 1}
                      />
                    </Flex>
                  </Padding>
                  <ButtonGroup fullWidth>
                    <Button
                      onClick={() => goBack(formik)}
                      size="l"
                      type="button"
                      styling="outlined"
                    >
                      Back
                    </Button>
                    <Button
                      size="l"
                      type="submit"
                      styling="green"
                      loading={formik.isSubmitting}
                    >
                      Next
                    </Button>
                  </ButtonGroup>
                </BottomBar>
              )}
            </Form>
          )}
        </Formik>
      )}
    </Mutation>
  );
};

export default Questions;
