import React from "react";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import ButtonGroup from "src/components/ButtonGroup";
import TextField from "src/components/TextField";
import Progress from "../../Progress";
import { Step, StepHeading } from '../../styles';
import validationSchema from "./validationSchema";

export default ({ match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/company_overview`);

  return (
    <div>
      <Step>Step 2 of 9</Step>
      <StepHeading>Project Overview</StepHeading>
      <Progress amount={2 / 0.1} />
      <Text marginBottom="l">
        Give a brief one line overview of the project
      </Text>
      <Formik
        onSubmit={async values => {
          const id = match.params.projectID;
          history.push(`/project_setup/${id}/goals`);
        }}
        validationSchema={validationSchema}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              multiline
              name="projectOverview"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Project overview.."
              marginBottom="xl"
              error={formik.submitCount > 0 && formik.errors.projectOverview}
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
