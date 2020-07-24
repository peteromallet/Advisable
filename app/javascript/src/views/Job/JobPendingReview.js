import React from "react";
import { motion } from "framer-motion";
import { Card, Avatar } from "@advisable/donut";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function PublishJob({ data }) {
  const { salesPerson } = data.project.user;

  return (
    <Card
      as={motion.div}
      padding="64px"
      textAlign="center"
      initial={{ opacity: 0, y: 100 }}
      animate={{ zIndex: 2, opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      exit={{ y: -40, opacity: 0, zIndex: 1, scale: 0.9, position: "absolute" }}
    >
      <Avatar
        size="xl"
        name={salesPerson.name}
        mb="l"
        mx="auto"
        url="https://images.unsplash.com/photo-1557425747-929b65a39785?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      />
      <JobSetupStepHeader mb="xs">
        {salesPerson.firstName} is reviewing your job!
      </JobSetupStepHeader>
      <JobSetupStepSubHeader>
        We will need to review the details before we find any applicants for
        this job. {salesPerson.firstName} will review the details of this job
        shortly and will let you know once it is live.
      </JobSetupStepSubHeader>
    </Card>
  );
}
