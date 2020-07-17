import React from "react";
import { motion } from "framer-motion";
import { Card } from "@advisable/donut";
import { UPDATE_PROJECT } from "./queries";
import { useMutation } from "@apollo/react-hooks";
import { useParams, useHistory } from "react-router-dom";
import PrimarySkillOption from "./PrimarySkillOption";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function JobPrimarySkill({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const skills = data.project.skills;

  const handleSelection = (skill) => (e) => {
    updateProject({
      variables: {
        input: {
          id,
          primarySkill: skill.name,
        },
      },
    });

    history.push(`/jobs/${id}/experience`);
  };

  return (
    <Card
      layout
      as={motion.div}
      padding="52px"
      initial={{ opacity: 0, y: 100 }}
      animate={{ zIndex: 2, opacity: 1, y: 0 }}
      exit={{ y: -40, opacity: 0, zIndex: 1, scale: 0.9, position: "absolute" }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      <JobSetupStepHeader mb="xs">
        Which of these is the most important?
      </JobSetupStepHeader>
      <JobSetupStepSubHeader mb="xl">
        You have added multiple skills. Which of these do you think is the most
        important?
      </JobSetupStepSubHeader>
      {skills.map((skill, i) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <PrimarySkillOption number={i + 1} onClick={handleSelection(skill)}>
            {skill.name}
          </PrimarySkillOption>
        </motion.div>
      ))}
    </Card>
  );
}
