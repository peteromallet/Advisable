import React from "react";
import { motion } from "framer-motion";
import { Card } from "@advisable/donut";
import { useParams, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field } from "formik";
import RangeSelection from "components/RangeSelection";
import { UPDATE_PROJECT } from "./queries";
import { JobSetupStepHeader } from "./styles";

export default function JobExperience({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const initialValues = {
    industryExperienceImportance: data.project.industryExperienceImportance,
  };

  const handleSubmit = (values, formik) => {
    updateProject({
      variables: {
        input: {
          id,
          industryExperienceImportance: Number(
            values.industryExperienceImportance,
          ),
        },
      },
    });

    history.push(`/jobs/${id}/location`);
  };

  const handleSelection = (formik) => (val) => {
    formik.setFieldValue("industryExperienceImportance", val);
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
            <JobSetupStepHeader mb="xl">
              How important is it that they have worked with a{" "}
              {user.industry?.name?.toLowerCase()}{" "}
              {user.companyType.toLowerCase()} before?
            </JobSetupStepHeader>
            <Field
              name="industryExperienceImportance"
              as={RangeSelection}
              onChange={handleSelection(formik)}
            />
          </Form>
        )}
      </Formik>
    </Card>
  );
}
