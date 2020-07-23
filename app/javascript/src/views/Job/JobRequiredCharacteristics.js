import React from "react";
import { motion } from "framer-motion";
import { Card, Box } from "@advisable/donut";
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
    <Card
      as={motion.div}
      padding="52px"
      initial={{ opacity: 0, y: 100 }}
      animate={{ zIndex: 2, opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      exit={{ y: -40, opacity: 0, zIndex: 1, scale: 0.9, position: "absolute" }}
    >
      <JobSetupStepHeader mb="xs">
        Which of these characteristics are essential?
      </JobSetupStepHeader>
      <JobSetupStepSubHeader mb="xl">
        Which of the characteristics that you have added do you think are
        essential for the freelancer to have?
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
    </Card>
  );
}
