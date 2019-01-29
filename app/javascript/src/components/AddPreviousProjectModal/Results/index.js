import React from "react";
import { Formik } from "formik";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import FieldRow from "src/components/FieldRow";
import StepDots from "src/components/StepDots";
import TextField from "src/components/TextField";
import validationSchema from "./validationSchema";

const ProjectDetails = ({ setValues, values, gotoNextStep, gotoPreviousStep }) => {
  const handleSubmit = values => {
    setValues(values);
    gotoNextStep();
  }

  return (
    <Formik onSubmit={handleSubmit} initialValues={values} validationSchema={validationSchema}>
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>
            <Heading size="s">Project Details</Heading>
          </Modal.Header>
          <Modal.Body>
            <FieldRow>
              <TextField
                autoFocus
                multiline
                minRows={10}
                name="results"
                placeholder="What were the results of your work during this project... "
                label="What were the results of your work during this project"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.results}
                error={formik.touched.results && formik.errors.results}
              />
            </FieldRow>
          </Modal.Body>
          <Modal.Footer>
            <Flex align="center">
              <Flex.Item style={{ width: "120px" }}>
                <Button block onClick={gotoPreviousStep} styling="outlined" size="l">
                  Back
                </Button>
              </Flex.Item>
              <Flex.Item distribute="fill">
                <StepDots current={3} total={4} />
              </Flex.Item>
              <Flex.Item style={{ width: "120px" }}>
                <Button block type="submit" size="l" styling="green">
                  Next
                </Button>
              </Flex.Item>
            </Flex>
          </Modal.Footer>
        </form>
      )}
    </Formik>
  )
}

export default ProjectDetails
