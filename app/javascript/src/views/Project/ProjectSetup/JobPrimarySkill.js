import React from "react";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import { UPDATE_PROJECT } from "./queries";
import { useMutation } from "@apollo/client";
import { useParams, useHistory, useLocation, Redirect } from "react-router-dom";
import PrimarySkillOption from "./PrimarySkillOption";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";
import { setupProgress } from "./SetupSteps";

export default function JobPrimarySkill({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  if (!setupProgress(data.project).skills) {
    return <Redirect to={`/projects/${id}/setup/skills`} />;
  }

  const skills = data.project.skills;

  const handleSubmit = async (values) => {
    updateProject({
      variables: {
        input: {
          id,
          primarySkill: values.primarySkill,
        },
      },
    });

    history.push({ ...location, pathname: `/projects/${id}/setup/experience` });
  };

  const initialValues = {
    primarySkill: data.project.primarySkill?.name,
  };

  return (
    <>
      <JobSetupStepHeader mb="xs">
        Which of these is the most important?
      </JobSetupStepHeader>
      <JobSetupStepSubHeader mb="xl">
        We&apos;ll make sure that each of the specialists we match you with have
        a proven track record in this skill.
      </JobSetupStepSubHeader>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {(formik) => (
          <Form>
            {skills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Field
                  type="radio"
                  name="primarySkill"
                  value={skill.name}
                  as={PrimarySkillOption}
                  number={i + 1}
                  onClick={() => {
                    formik.submitForm();
                  }}
                >
                  {skill.name}
                </Field>
              </motion.div>
            ))}
          </Form>
        )}
      </Formik>
    </>
  );
}
