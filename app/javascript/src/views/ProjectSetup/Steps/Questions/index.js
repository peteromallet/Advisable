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
  const goBack = () => history.push(`/project_setup/${id}/nice_to_have`);

  return (
    <div>
      <Heading>Step 7 of 9</Heading>
      <Heading>Qualification Question's</Heading>
      <Progress amount={7 / 0.09} />
      <Text marginBottom="l">
        We'll get the specialist to answer these question in order to assess
        their suitability for this project.
      </Text>
      <Formik
        onSubmit={async values => {
          const id = match.params.projectID;
          history.push(`/project_setup/${id}/terms`);
        }}
        initialValues={{ questions: [] }}
        validationSchema={validationSchema}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <ListInput
              name="questions"
              value={formik.values.questions}
              placeholder="Add a question"
              error={formik.submitCount > 0 && formik.errors.questions}
              onChange={questions =>
                formik.setFieldValue("questions", questions)
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
