import * as React from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form, FormikProps } from "formik";
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

const Questions = ({ application, match, history, steps, currentStep }) => {
  const isMobile = useScreenSize("small");
  const { applicationId } = match.params;
  const questions = application.questions.map(q => q.question);
  const number = match.params.number;
  const question = questions[number - 1];

  if (!match.params.number) {
    return <Redirect to={`/invites/${applicationId}/apply/questions/1`} />;
  }

  const goBack = () => {
    let url = `/invites/${applicationId}/apply`
    history.replace(url);
  }

  const handleSubmit = () => {};

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        questions: application.questions
      }}
    >
      {formik => (
        <Form>
          <Padding size="xl">
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
                name="introduction"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                minRows={8}
                maxLength={400}
                label={question}
                placeholder={question}
              />
            </FieldRow>
          </Padding>

          {!isMobile && (
            <React.Fragment>
              <Divider />
              <Padding size="xl">
                <Button styling="green" size="l">
                  Next
                </Button>
              </Padding>
            </React.Fragment>
          )}

          {isMobile && (
            <BottomBar>
              <Padding bottom="m">
                <Flex align="center" distribute="center">
                  <StepDots total={steps.length} current={currentStep + 1} />
                </Flex>
              </Padding>
              <ButtonGroup fullWidth>
                <Button onClick={goBack} size="l" type="button" styling="outlined">
                  Back
                </Button>
                <Button size="l" type="submit" styling="green">
                  Next
                </Button>
              </ButtonGroup>
            </BottomBar>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Questions;
