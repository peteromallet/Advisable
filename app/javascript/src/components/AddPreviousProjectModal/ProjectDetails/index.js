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
                name="skills"
                placeholder="e.g Facebook Marketing"
                label="What skills did you use for this project?"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.skills}
                error={formik.touched.skills && formik.errors.skills}
              />
            </FieldRow>
            <FieldRow>
              <TextField
                multiline
                maxLength={200}
                name="requirements"
                placeholder="They were looking for..."
                description='This should start with "They were looking for...".'
                label="Give a short overview of the type of person they needed for this project"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.requirements}
                error={formik.touched.requirements && formik.errors.requirements}
              />
            </FieldRow>
            <FieldRow>
              <TextField
                multiline
                maxLength={200}
                name="description"
                placeholder="They were looking for..."
                description='This should start with "The project...".'
                label="Give a short overview of the project"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.touched.description && formik.errors.description}
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
                <StepDots current={2} total={4} />
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
