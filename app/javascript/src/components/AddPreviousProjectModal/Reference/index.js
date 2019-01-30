import React from "react";
import { Formik } from "formik";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import Checkbox from "src/components/Checkbox";
import FieldRow from "src/components/FieldRow";
import StepDots from "src/components/StepDots";
import TextField from "src/components/TextField";
import validationSchema from "./validationSchema";

const ProjectReference = ({
  setValues,
  values,
  gotoNextStep,
  gotoPreviousStep
}) => {
  const handleSubmit = values => {
    setValues(values);
    gotoNextStep();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={values}
      validationSchema={validationSchema}
    >
      {formik => (
        <React.Fragment>
          <Modal.Header>
            <Heading size="s">Project Reference</Heading>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <FieldRow>
                <TextField
                  autoFocus
                  name="contactName"
                  placeholder="e.g Jane Doe"
                  label="What was the name of your contact with this client?"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contactName}
                  error={
                    formik.touched.contactName && formik.errors.contactName
                  }
                />
              </FieldRow>
              <FieldRow>
                <React.Fragment>
                  <TextField
                    name="contactEmail"
                    placeholder="e.g jane@company.com"
                    marginBottom="m"
                    label="What’s their email address?"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.contactEmail}
                    error={
                      formik.touched.contactEmail && formik.errors.contactEmail
                    }
                    description="If possible, please share their corporate email address. If not, if possible, please share the email address associated with their LinkedIn account."
                  />
                  <Checkbox
                    name="canContactClient"
                    label="It’s ok for Advisable to contact this client to validate the project"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.canContact}
                    error={
                      formik.touched.canContact && formik.errors.canContact
                    }
                  />
                </React.Fragment>
              </FieldRow>
              <FieldRow>
                <TextField
                  name="contactRole"
                  placeholder="e.g They supervised the project"
                  label="What was their role for this project?"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contactRole}
                  error={
                    formik.touched.contactRole && formik.errors.contactRole
                  }
                />
              </FieldRow>
              <FieldRow>
                <TextField
                  name="contactJobTitle"
                  placeholder="e.g Head of marketing"
                  label="What was their job title?"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contactJobTitle}
                  error={
                    formik.touched.contactJobTitle &&
                    formik.errors.contactJobTitle
                  }
                />
              </FieldRow>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Flex align="center">
              <Flex.Item style={{ width: "120px" }}>
                <Button
                  block
                  onClick={gotoPreviousStep}
                  styling="outlined"
                  size="l"
                >
                  Back
                </Button>
              </Flex.Item>
              <Flex.Item distribute="fill">
                <StepDots current={4} total={4} />
              </Flex.Item>
              <Flex.Item style={{ width: "120px" }}>
                <Button block onClick={formik.submitForm} size="l" styling="green">
                  Next
                </Button>
              </Flex.Item>
            </Flex>
          </Modal.Footer>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default ProjectReference;
