import React from "react";
import Card from "../../components/Card";
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import Padding from "../../components/Spacing/Padding";
import ProjectMonthlyLimit from "../../components/ProjectMonthlyLimit";

const SetMonthlyLimit = ({ applicationId }) => {
  return (
    <Container size="s">
      <Card>
        <Padding size="xl">
          <Padding bottom="l">
            <Heading>Set a monthly limit for this project</Heading>
          </Padding>
          <ProjectMonthlyLimit applicationId={applicationId} />
        </Padding>
      </Card>
    </Container>
  );
};

export default SetMonthlyLimit;
