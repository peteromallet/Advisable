import React from "react";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import { Mobile } from "src/components/Breakpoint";
import ButtonGroup from "src/components/ButtonGroup";
import TextField from "src/components/TextField";
import validationSchema from "./validationSchema";

export default ({ match, history, position, opacity }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/company_overview`);

  return (
    <div style={{ position, opacity }}>
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
              autoHeight
              name="projectOverview"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Project overview.."
              marginBottom="xl"
              error={formik.submitCount > 0 && formik.errors.projectOverview}
            />
            <Mobile>
              {isMobile => (
                <ButtonGroup fullWidth={isMobile}>
                  <Button type="button" size="l" styling="outlined" onClick={goBack}>
                    Back
                  </Button>
                  <Button type="submit" size="l" styling="primary">
                    Continue
                  </Button>
                </ButtonGroup>
              )}
            </Mobile>
          </form>
        )}
      </Formik>
    </div>
  );
};
