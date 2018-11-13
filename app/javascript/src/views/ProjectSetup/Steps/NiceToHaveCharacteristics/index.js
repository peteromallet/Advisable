import React from "react";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import ListInput from "src/components/ListInput";
import ButtonGroup from "src/components/ButtonGroup";
import validationSchema from "./validationSchema";

export default ({ match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/must_have`);

  return (
    <div>
      <Text marginBottom="l">
      These are characteristics that it'd be nice for your specialist to have, but not essential.
      </Text>
      <Formik
        onSubmit={async values => {
          const id = match.params.projectID;
          history.push(`/project_setup/${id}/questions`);
        }}
        initialValues={{ niceToHaveCharacteristics: [] }}
        validationSchema={validationSchema}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <ListInput
              marginBottom="xl"
              name="niceToHaveCharacteristics"
              value={formik.values.niceToHaveCharacteristics}
              placeholder="+ Add a characteristic"
              error={
                formik.submitCount > 0 && formik.errors.niceToHaveCharacteristics
              }
              onChange={characteristics =>
                formik.setFieldValue("niceToHaveCharacteristics", characteristics)
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
