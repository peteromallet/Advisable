import * as React from "react";
import { Form, Field } from "formik";
import { Text } from "@advisable/donut";
import { useScreenSize } from "../../../utilities/screenSizes";
import { Heading, Padding, Button } from "../../../components";
import PreviousProject from "./PreviousProject";
import Actions from "../Actions";

const PreviousProjects = ({
  steps,
  currentStep,
  application,
  previousProjects,
  onAdd,
  onBack,
  formik,
}) => {
  const isMobile = useScreenSize("small");

  return (
    <Form>
      <Padding size={isMobile ? "l" : "xl"}>
        <Text
          mb="xs"
          as="h1"
          fontSize="xxl"
          color="blue.9"
          fontWeight="semibold"
        >
          References
        </Text>
        <Text lineHeight="m" color="neutral.7" mb="l">
          Previous projects are the most effective way to validate your
          experience and suitability for a project. The average successful
          application attaches at least 2 previous projects to their
          application.
        </Text>
        <Padding bottom="xs">
          <Heading level={6}>Previous Projects</Heading>
        </Padding>
        {previousProjects.map(p => (
          <Field
            type="checkbox"
            name="references"
            key={p.project.id}
            as={PreviousProject}
            value={p.project.airtableId}
            project={p.project}
          />
        ))}
        <Padding top="m">
          <Button size="l" type="button" styling="outlined" onClick={onAdd}>
            Add a previous project
          </Button>
        </Padding>
      </Padding>
      <Actions
        steps={steps}
        onBack={onBack}
        currentStep={currentStep}
        application={application}
        isSubmitting={formik.isSubmitting}
      />
    </Form>
  );
};

export default PreviousProjects;
