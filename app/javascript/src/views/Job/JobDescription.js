import React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ArrowRight } from "@styled-icons/feather";
import { Formik, Form, Field } from "formik";
import { Error } from "@advisable/donut";
import SubmitButton from "components/SubmitButton";
import BulletPointInput from "components/BulletPointInput";
import { UPDATE_PROJECT } from "./queries";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function JobDescription({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const { primarySkill } = data.project;

  const initialValues = {
    goals: data.project.goals,
  };

  const handleSubmit = async (values, formik) => {
    const response = await updateProject({
      variables: {
        input: {
          id,
          ...values,
        },
      },
    });

    if (response.errors) {
      formik.setStatus("Failed to update description, please try again.");
    } else {
      if (location.state?.readyToPublish) {
        history.push(`/jobs/${id}/publish`);
      } else {
        history.push(`/jobs/${id}/likely_to_hire`);
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <JobSetupStepHeader mb="xs">
            Briefly describe your goals from working with this specialist
          </JobSetupStepHeader>
          <JobSetupStepSubHeader mb="l">
            We'll make sure that specialists we match you with have experience
            helping companies achieve similar goals.
          </JobSetupStepSubHeader>
          <Field
            name="goals"
            as={BulletPointInput}
            marginBottom="l"
            placeholder={
              primarySkill?.goalPlaceholder ||
              "e.g Building a Facebook advertising campaign for launching our new product"
            }
            onChange={(items) => formik.setFieldValue("goals", items)}
          />
          <SubmitButton
            size="l"
            suffix={<ArrowRight />}
            disabled={formik.values.goals.length === 0}
          >
            Continue
          </SubmitButton>
          {formik.status && <Error marginTop="m">{formik.status}</Error>}
        </Form>
      )}
    </Formik>
  );
}
