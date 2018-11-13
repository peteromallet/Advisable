import React from "react";
import { Formik } from "formik";
import Text from "src/components/Text";
import { Mobile } from "src/components/Breakpoint";
import Button from "src/components/Button";
import ButtonGroup from "src/components/ButtonGroup";
import TextField from "src/components/TextField";
import validationSchema from "./validationSchema";

export default ({ match, history, position, opacity }) => {
  return (
    <div style={{ position, opacity }}>
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
              autoFocus
              multiline
              autoHeight
              name="companyOverview"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Company overview.."
              marginBottom="xl"
              error={formik.submitCount > 0 && formik.errors.companyOverview}
            />
            <Mobile>
              {isMobile => (
                <ButtonGroup fullWidth={isMobile}>
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
