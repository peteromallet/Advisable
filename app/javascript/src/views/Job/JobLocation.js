import React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import RangeSelection from "components/RangeSelection";
import { UPDATE_PROJECT } from "./queries";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function JobLocation({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const initialValues = {
    locationImportance: data.project.locationImportance,
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

    if (location.state?.readyToPublish) {
      history.push(`/jobs/${id}/publish`);
    } else {
      history.push(`/jobs/${id}/characteristics`);
    }
  };

  const handleSelection = (formik) => (val) => {
    formik.setFieldValue("locationImportance", val);
    formik.submitForm();
  };

  const { user } = data.project;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <JobSetupStepHeader mb="xs">
            How important is it that they are in {user.location}?
          </JobSetupStepHeader>
          <JobSetupStepSubHeader mb="l">
            The broader the location, the more likely we'll have the perfect
            match for your project.
          </JobSetupStepSubHeader>
          <Field
            name="locationImportance"
            as={RangeSelection}
            onChange={handleSelection(formik)}
          />
        </Form>
      )}
    </Formik>
  );
}
