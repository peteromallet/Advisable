import React from "react";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import ListInput from "src/components/ListInput";
import ButtonGroup from "src/components/ButtonGroup";
import Progress from "../../Progress";
import validationSchema from "./validationSchema";

export default ({ match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/specialist_overview`);

  return (
    <div>
      <Heading>Step 5 of 9</Heading>
      <Heading>Must-have characteristic's</Heading>
      <Progress amount={5 / 0.09} />
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
              name="mustHaveCharacteristics"
              value={formik.values.mustHaveCharacteristics}
              placeholder="Add a characteristic"
              error={
                formik.submitCount > 0 && formik.errors.mustHaveCharacteristics
              }
              onChange={characteristics =>
                formik.setFieldValue("mustHaveCharacteristics", characteristics)
              }
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
