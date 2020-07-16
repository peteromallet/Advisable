import React from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Box, Text, Autocomplete, Error, Input } from "@advisable/donut";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function JobPrimarySkill({ data }) {
  const initialValues = {
    primarySkill: "",
  };

  const handleSubmit = async (values) => {};

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <JobSetupStepHeader mb="s">
            Which of these skills is the most important?
          </JobSetupStepHeader>
          <JobSetupStepSubHeader mb="l">
            You have added multiple skills. Which of these do you think is the
            most important?
          </JobSetupStepSubHeader>
        </Form>
      )}
    </Formik>
  );
}
