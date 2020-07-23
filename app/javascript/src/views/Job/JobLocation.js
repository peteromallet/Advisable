import React from "react";
import { motion } from "framer-motion";
import { Card } from "@advisable/donut";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
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
    <Card
      as={motion.div}
      padding="52px"
      initial={{ opacity: 0, y: 100 }}
      animate={{ zIndex: 2, opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      exit={{ y: -40, opacity: 0, zIndex: 1, scale: 0.9, position: "absolute" }}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <JobSetupStepHeader mb="xs">
              How important is it that they are in {user.location}?
            </JobSetupStepHeader>
            <JobSetupStepSubHeader mb="l">
              Do you need this freelancer to spend any time on site or can they
              complete their work remotely?
            </JobSetupStepSubHeader>
            <Field
              name="locationImportance"
              as={RangeSelection}
              onChange={handleSelection(formik)}
            />
          </Form>
        )}
      </Formik>
    </Card>
  );
}
