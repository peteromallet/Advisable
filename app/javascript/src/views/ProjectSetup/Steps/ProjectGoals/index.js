import React from "react";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import { Mobile } from "src/components/Breakpoint";
import ListInput from "src/components/ListInput";
import ButtonGroup from "src/components/ButtonGroup";
import validationSchema from "./validationSchema";

export default ({ match, history, position, opacity }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/project_overview`);

  return (
    <div style={{ position, opacity }}>
      <Text marginBottom="l">What goal’s do you have for this project?</Text>
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
              autoFocus
              marginBottom="xl"
              value={formik.values.goals}
              placeholder="+ Add a project goal"
              error={formik.submitCount > 0 && formik.errors.goals}
              onChange={goals => formik.setFieldValue("goals", goals)}
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
