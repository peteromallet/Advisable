import React from "react";
import { motion } from "framer-motion";
import { Box } from "@advisable/donut";
import Project from "./Project";

const ProjectsList = ({ projects }) => {
  return (
    <Box
      display="grid"
      gridGap="24px"
      gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}
    >
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.075 * (i + 1), duration: 0.3 }}
        >
          <Project project={project} />
        </motion.div>
      ))}
    </Box>
  );
};

export default ProjectsList;
