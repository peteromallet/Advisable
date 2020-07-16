import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field } from "formik";
import RangeSelection from "components/RangeSelection";
import { UPDATE_PROJECT } from "./queries";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function JobExperience({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const initialValues = {
    experienceImportance: "",
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

    history.push(`/jobs/${id}/characteristics`);
  };

  const handleSelection = (formik) => (val) => {
    formik.setFieldValue("location", val);
    formik.submitForm();
  };

  const { user } = data.project;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <JobSetupStepHeader mb="xl">
            How important is it that they have worked with a{" "}
            {user.industry?.name?.toLowerCase()}{" "}
            {user.companyType.toLowerCase()} before?
          </JobSetupStepHeader>
          <Field
            name="experienceImportance"
            as={RangeSelection}
            onChange={handleSelection(formik)}
          />
        </Form>
      )}
    </Formik>
  );
}
