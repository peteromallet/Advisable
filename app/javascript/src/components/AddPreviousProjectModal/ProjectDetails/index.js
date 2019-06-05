import React from "react";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import FieldRow from "src/components/FieldRow";
import StepDots from "src/components/StepDots";
import TextField from "src/components/TextField";
import { useMobile } from "src/components/Breakpoint";
import { Text } from "@advisable/donut";
import validationSchema from "./validationSchema";

const ProjectDetails = ({ skills, formik, gotoPreviousStep }) => {
  const isMobile = useMobile();
  return (
    <React.Fragment>
      <Modal.Header>
        <Text size="l" weight="semibold">
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
              placeholder="Please provide as specific information as possible about the results of this project. Include URLs and examples of work where possible."
              description="Please provide as specific information as possible about the results of this project. Include URLs and examples of work where possible."
              label="Please provide the problem the client had, an overview of the project, how you approached it and the results you achieved"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              error={formik.touched.description && formik.errors.description}
            />
          </FieldRow>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Flex align="center">
          <Flex.Item style={{ width: isMobile ? "50%" : "120px" }}>
            <Button
              block
              margin-right="m"
              onClick={gotoPreviousStep}
              styling="outlined"
              size="l"
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
              block
              onClick={formik.submitForm}
              marginLeft="m"
              size="l"
              styling="green"
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
