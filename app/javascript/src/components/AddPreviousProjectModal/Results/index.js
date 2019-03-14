import React from "react";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import FieldRow from "src/components/FieldRow";
import StepDots from "src/components/StepDots";
import TextField from "src/components/TextField";
import { useMobile } from "src/components/Breakpoint";
import validationSchema from "./validationSchema";

const ProjectDetails = ({ formik, gotoPreviousStep }) => {
  let isMobile = useMobile();

  return (
    <React.Fragment>
      <Modal.Header>
        <Heading size="s">Results</Heading>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FieldRow>
            <TextField
              autoFocus
              multiline
              minRows={10}
              name="results"
              placeholder="We achieved..."
              label="What were the results of your work during this project?"
              description="Please provide as specific information as possible about the results of this project. Include URLs and examples of work where possible.  You're welcome to re-use content you've written elsewhere for this section"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.results}
              error={formik.touched.results && formik.errors.results}
            />
          </FieldRow>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Flex align="center">
          <Flex.Item style={{ width: isMobile ? "50%" : "120px" }}>
            <Button
              block
              marginRight="m"
              onClick={gotoPreviousStep}
              styling="outlined"
              size="l"
            >
              Back
            </Button>
          </Flex.Item>
          {!isMobile && (
            <Flex.Item distribute="fill">
              <StepDots current={3} total={4} />
            </Flex.Item>
          )}
          <Flex.Item style={{ width: isMobile ? "50%" : "120px" }}>
            <Button
              block
              marginLeft="m"
              onClick={formik.submitForm}
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
