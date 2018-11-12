import React from "react";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import ListInput from "src/components/ListInput";
import ButtonGroup from "src/components/ButtonGroup";
import Progress from "../../Progress";
import { Step, StepHeading } from '../../styles';
import validationSchema from "./validationSchema";

export default ({ match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/project_overview`);

  return (
    <div>
      <Step>Step 3 of 9</Step>
      <StepHeading>Project Goals</StepHeading>
      <Progress amount={3 / 0.1} />
      <Text marginBottom="l">
        What goal’s do you have for this project?
      </Text>
      <Formik
        onSubmit={async values => {
          const id = match.params.projectID;
          history.push(`/project_setup/${id}/specialist_overview`);
        }}
        initialValues={{ goals: [] }}
        validationSchema={validationSchema}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <ListInput
              name="goals"
              value={formik.values.goals}
              placeholder="Add a project goal"
              error={formik.submitCount > 0 && formik.errors.goals}
              onChange={goals => formik.setFieldValue("goals", goals)}
            />
            <ButtonGroup>
              <Button type="button" size="l" onClick={goBack}>
                Back
              </Button>
              <Button type="submit" size="l" primary>
                Continue
              </Button>
            </ButtonGroup>
          </form>
        )}
      </Formik>
    </div>
  );
};
