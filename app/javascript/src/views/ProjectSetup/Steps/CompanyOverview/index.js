import React from "react";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import TextField from "src/components/TextField";
import Progress from "../../Progress";
import { Step, StepHeading } from '../../styles';
import validationSchema from "./validationSchema";

export default ({ match, history, position }) => {
  return (
    <div style={{ position }}>
      <Step>Step 1 of 9</Step>
      <StepHeading>Company Overview</StepHeading>
      <Progress amount={1 / 0.1} />
      <Text marginBottom="l">
        Feel free to remove any identifying information if you'd rather the
        consultant doesn't know who you are.
      </Text>
      <Formik
        onSubmit={async values => {
          const id = match.params.projectID;
          history.push(`/project_setup/${id}/project_overview`);
        }}
        validationSchema={validationSchema}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              multiline
              name="companyOverview"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Company overview.."
              marginBottom="xl"
              error={formik.submitCount > 0 && formik.errors.companyOverview}
            />
            <Button type="submit" size="l" primary>
              Continue
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
