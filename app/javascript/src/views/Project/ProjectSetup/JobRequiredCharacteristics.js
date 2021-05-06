import React from "react";
import { Box } from "@advisable/donut";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useParams, useHistory, useLocation, Redirect } from "react-router-dom";
import SubmitButton from "components/SubmitButton";
import { UPDATE_PROJECT } from "./queries";
import CheckboxInput from "src/components/CheckboxInput";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";
import { setupProgress } from "./SetupSteps";

export default function JobRequiredCharacteristics({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const { requiredCharacteristics, characteristics } = data.project;

  if (!setupProgress(data.project).characteristics) {
    return <Redirect to={`/projects/${id}/setup/characteristics`} />;
  }

  const initialValues = {
    requiredCharacteristics: requiredCharacteristics.filter(
      (characteristic) => {
        return characteristics.includes(characteristic);
      },
    ),
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
      formik.setStatus("Failed to update characteristics, please try again.");
    } else {
      if (location.state?.readyToPublish) {
        history.push(`/projects/${id}/setup/publish`);
      } else {
        history.push(`/projects/${id}/setup/description`);
      }
    }
  };

  return (
    <>
      <JobSetupStepHeader mb="xs">
        Which of these characteristics are essential?
      </JobSetupStepHeader>
      <JobSetupStepSubHeader mb="xl">
        We&apos;ll make sure that whichever specialists we match you with have
        these characteristics.
      </JobSetupStepSubHeader>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <Box mb="xl">
              {characteristics.map((characteristic, i) => (
                <Field
                  key={i}
                  type="checkbox"
                  value={characteristic}
                  as={CheckboxInput}
                  name="requiredCharacteristics"
                >
                  {characteristic}
                </Field>
              ))}
            </Box>

            <SubmitButton
              size="l"
              disabled={formik.values.requiredCharacteristics.length === 0}
              suffix={<ArrowRight />}
            >
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
}
