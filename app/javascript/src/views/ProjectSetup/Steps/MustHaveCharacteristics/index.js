import React from "react";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import ListInput from "src/components/ListInput";
import ButtonGroup from "src/components/ButtonGroup";
import validationSchema from "./validationSchema";

export default ({ match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/specialist_overview`);

  return (
    <div>
      <Text marginBottom="l">
        These are characteristics that is necessary that your specialist has.
      </Text>
      <Formik
        onSubmit={async values => {
          const id = match.params.projectID;
          history.push(`/project_setup/${id}/nice_to_have`);
        }}
        initialValues={{ mustHaveCharacteristics: [] }}
        validationSchema={validationSchema}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <ListInput
              marginBottom="xl"
              name="mustHaveCharacteristics"
              value={formik.values.mustHaveCharacteristics}
              placeholder="+ Add a characteristic"
              error={
                formik.submitCount > 0 && formik.errors.mustHaveCharacteristics
              }
              onChange={characteristics =>
                formik.setFieldValue("mustHaveCharacteristics", characteristics)
              }
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
