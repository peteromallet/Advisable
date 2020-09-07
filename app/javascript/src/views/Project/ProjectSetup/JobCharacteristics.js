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

export default function JobCharacteristics({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const { primarySkill } = data.project;

  const initialValues = {
    characteristics: data.project.characteristics,
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
      history.push({
        ...location,
        pathname: `/projects/${id}/setup/required_characteristics`,
      });
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <JobSetupStepHeader mb="xs">
            What characteristics should this specialist have?
          </JobSetupStepHeader>
          <JobSetupStepSubHeader mb="l">
            We'll check this list against every specialist we match you with.
          </JobSetupStepSubHeader>
          <Field
            name="characteristics"
            as={BulletPointInput}
            marginBottom="xl"
            autoFocus
            placeholder={
              primarySkill?.characteristicPlaceholder ||
              "e.g Strong communication skills"
            }
            onChange={(items) => formik.setFieldValue("characteristics", items)}
          />
          <SubmitButton
            size="l"
            suffix={<ArrowRight />}
            disabled={formik.values.characteristics.length === 0}
          >
            Continue
          </SubmitButton>
          {formik.status && <Error marginTop="m">{formik.status}</Error>}
        </Form>
      )}
    </Formik>
  );
}
