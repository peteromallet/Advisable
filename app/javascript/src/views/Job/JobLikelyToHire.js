import React from "react";
import { Formik, Form, Field } from "formik";
import RangeSelection from "components/RangeSelection";
import { UPDATE_PROJECT } from "./queries";
import { useMutation } from "@apollo/react-hooks";
import { useParams, useHistory } from "react-router-dom";
import { JobSetupStepHeader } from "./styles";

export default function JobLikelyToHire({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const initialValues = {
    likelyToHire: data.project.likelyToHire,
  };

  const handleSubmit = (values, formik) => {
    updateProject({
      variables: {
        input: {
          id,
          ...values,
        },
      },
    });

    history.push(`/jobs/${id}/publish`);
  };

  const handleSelection = (formik) => (val) => {
    formik.setFieldValue("likelyToHire", val);
    formik.submitForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <JobSetupStepHeader mb="l">
            If Advisable finds you the perfect person for this, how likely are
            you to hire them?
          </JobSetupStepHeader>
          <Field
            name="likelyToHire"
            as={RangeSelection}
            onChange={handleSelection(formik)}
            options={[
              { label: "Not Likely", value: 0 },
              { label: "Maybe", value: 1 },
              { label: "Likely", value: 2 },
            ]}
          />
        </Form>
      )}
    </Formik>
  );
}
