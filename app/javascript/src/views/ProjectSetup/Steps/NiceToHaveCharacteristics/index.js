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
  const goBack = () => history.push(`/project_setup/${id}/must_have`);

  return (
    <div>
      <Heading>Step 6 of 9</Heading>
      <Heading>Nice-to-have characteristic's</Heading>
      <Progress amount={5 / 0.09} />
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
              name="niceToHaveCharacteristics"
              value={formik.values.niceToHaveCharacteristics}
              placeholder="Add a characteristic"
              error={
                formik.submitCount > 0 && formik.errors.niceToHaveCharacteristics
              }
              onChange={characteristics =>
                formik.setFieldValue("niceToHaveCharacteristics", characteristics)
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
