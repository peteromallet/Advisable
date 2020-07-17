import React from "react";
import { motion } from "framer-motion";
import { Card } from "@advisable/donut";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { ArrowRight } from "@styled-icons/feather";
import { useParams, useHistory } from "react-router-dom";
import SubmitButton from "components/SubmitButton";
import { UPDATE_PROJECT } from "./queries";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function JobRequiredCharacteristics({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const initialValues = {
    requiredCharacteristics: [],
  };

  const handleSubmit = (e) => {
    history.push(`/jobs/${id}/description`);
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
        essnetial for the freelancer to have?
      </JobSetupStepSubHeader>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <SubmitButton size="l" suffix={<ArrowRight />}>
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
