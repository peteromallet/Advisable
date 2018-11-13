import React from "react";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import ButtonGroup from "src/components/ButtonGroup";
import TextField from "src/components/TextField";
import validationSchema from "./validationSchema";

export default ({ match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/goals`);

  return (
    <div>
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
              autoHeight
              name="specialistOverview"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Specialist overview.."
              marginBottom="xl"
              error={formik.submitCount > 0 && formik.errors.specialistOverview}
            />
            <ButtonGroup>
              <Button type="button" size="l" styling="outlined" onClick={goBack}>
                Back
              </Button>
              <Button type="submit" size="l" styling="primary">
                Continue
              </Button>
            </ButtonGroup>
          </form>
        )}
      </Formik>
    </div>
  );
};
