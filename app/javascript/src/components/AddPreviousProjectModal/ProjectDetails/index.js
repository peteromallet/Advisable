import React from "react";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import FieldRow from "src/components/FieldRow";
import StepDots from "src/components/StepDots";
import Checkbox from "src/components/Checkbox";
import TextField from "src/components/TextField";
import { useMobile } from "src/components/Breakpoint";
import { Text, Button } from "@advisable/donut";
import validationSchema from "./validationSchema";

const ProjectDetails = ({ skills, formik, gotoPreviousStep }) => {
  const isMobile = useMobile();
  return (
    <React.Fragment>
      <Modal.Header>
        <Text size="l" weight="medium">
          Project Overview
        </Text>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FieldRow>
            <TextField
              multiline
              name="description"
              minRows={8}
              placeholder="Project overview..."
              description={`This will be need to be validated by ${formik.values.clientName} and will be seen by potential clients when you’re applying for projects on Advisable. Please provide as specific information as possible about the results of this project. Include URLs and examples of work where possible.`}
              label="Please provide the problem the client had, an overview of the project, how you approached it and the results you achieved"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              error={formik.touched.description && formik.errors.description}
            />
          </FieldRow>
          <Checkbox
            name="publicUse"
            label="It is okay for Advisable to use anonymised details of this project publicly to promote me"
            onChange={formik.handleChange}
            value={formik.values.publicUse}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Flex align="center">
          <Flex.Item style={{ width: isMobile ? "50%" : "120px" }}>
            <Button
              width="100%"
              appearance="outlined"
              onClick={gotoPreviousStep}
            >
              Back
            </Button>
          </Flex.Item>
          {!isMobile && (
            <Flex.Item distribute="fill">
              <StepDots current={2} total={3} />
            </Flex.Item>
          )}
          <Flex.Item style={{ width: isMobile ? "50%" : "120px" }}>
            <Button
              width="100%"
              intent="success"
              appearance="primary"
              iconRight="arrow-right"
              onClick={formik.submitForm}
            >
              Next
            </Button>
          </Flex.Item>
        </Flex>
      </Modal.Footer>
    </React.Fragment>
  );
};

ProjectDetails.validationSchema = validationSchema;

export default ProjectDetails;
