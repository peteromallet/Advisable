import React, { useState } from "react";
import Text from "src/components/Text";
import Button from "src/components/Button";
import Review from "src/components/Review";
import Heading from "src/components/Heading";
import PreviousProjectModal from "src/components/PreviousProjectModal";
import { PreviousProject, ProjectTitle } from "./styles";

export default ({ project }) => {
  const [isOpen, setOpen] = useState(false);

  const openProject = e => {
    e.preventDefault();
    setOpen(true)
  }

  return (
    <React.Fragment>
      <PreviousProjectModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        id={project.id}
        type={project.type}
        specialistId={project.specialist.airtableId}
      />
      <PreviousProject>
        <Heading marginBottom="xs" level={4}>
          <ProjectTitle href="#" onClick={openProject}>
            {project.title} at {project.companyName}
          </ProjectTitle>
        </Heading>
        <Text marginBottom="l" size="s">
          {project.description}
        </Text>
        {project.reviews.map(review => (
          <Review
            key={review.id}
            review={review}
            companyName={project.companyName}
          />
        ))}
        <Button styling="outlined" marginTop="xl" onClick={openProject}>
          View project details
        </Button>
      </PreviousProject>
    </React.Fragment>
  );
};
