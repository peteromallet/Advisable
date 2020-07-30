import React from "react";
import { Box } from "@advisable/donut";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { ArrowRight } from "@styled-icons/feather";
import { useParams, useHistory, useLocation } from "react-router-dom";
import SubmitButton from "components/SubmitButton";
import { UPDATE_PROJECT } from "./queries";
import RequiredCharacteristic from "./RequiredCharacteristic";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function JobRequiredCharacteristics({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const { requiredCharacteristics, characteristics } = data.project;

  const initialValues = {
    requiredCharacteristics: requiredCharacteristics,
  };

  const handleSubmit = async (values) => {
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
        history.push(`/jobs/${id}/publish`);
      } else {
        history.push(`/jobs/${id}/description`);
      }
    }
  };

  return (
    <>
      <JobSetupStepHeader mb="xs">
        Which of these characteristics are essential?
      </JobSetupStepHeader>
      <JobSetupStepSubHeader mb="xl">
        We'll make sure that whichever specialists we match you with have these
        characteristics.
      </JobSetupStepSubHeader>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Box mb="xl">
            {characteristics.map((characteristic, i) => (
              <Field
                key={i}
                type="checkbox"
                value={characteristic}
                as={RequiredCharacteristic}
                name="requiredCharacteristics"
              >
                {characteristic}
              </Field>
            ))}
          </Box>

          <SubmitButton size="l" suffix={<ArrowRight />}>
            Continue
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
}
