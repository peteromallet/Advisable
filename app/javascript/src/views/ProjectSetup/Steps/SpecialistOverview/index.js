import React from "react";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import ButtonGroup from "src/components/ButtonGroup";
import TextField from "src/components/TextField";
import Progress from "../../Progress";
import validationSchema from "./validationSchema";

export default ({ match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/goals`);

  return (
    <div>
      <Heading>Step 4 of 9</Heading>
      <Heading>Specialist Overview</Heading>
      <Progress amount={4 / 0.09} />
      <Text marginBottom="l">
      Give a brief one sentence overview of what you want to get out of an engagement with a specialist.
      </Text>
      <Formik
        onSubmit={async values => {
          const id = match.params.projectID;
          history.push(`/project_setup/${id}/must_have`);
        }}
        validationSchema={validationSchema}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              multiline
              name="specialistOverview"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Specialist overview.."
              marginBottom="xl"
              error={formik.submitCount > 0 && formik.errors.specialistOverview}
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
