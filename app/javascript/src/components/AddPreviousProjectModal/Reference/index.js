import React from "react";
import { Text, Box, Button } from "@advisable/donut";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import StepDots from "src/components/StepDots";
import TextField from "src/components/TextField";
import { useMobile } from "src/components/Breakpoint";
import validationSchema from "./validationSchema";

const ProjectReference = ({ formik, gotoPreviousStep }) => {
  let isMobile = useMobile();

  return (
    <>
      <Modal.Header>
        <Text size="l" weight="medium">
          Project Contact
        </Text>
        <Text size="s" lineHeight="s" mt="xxs" color="neutral.7">
          We will need someone from {formik.values.clientName} to validate this
          project. You will receive an email after adding this project to begin
          the validation process.
        </Text>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Box mb="m">
            <TextField
              name="contactName"
              placeholder="Contact name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.contactName}
              label="What was the name of your contact with this client?"
              error={formik.touched.contactName && formik.errors.contactName}
            />
          </Box>
          <TextField
            name="contactJobTitle"
            placeholder="Contact job title"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.contactJobTitle}
            label="What was their job title?"
            error={
              formik.touched.contactJobTitle && formik.errors.contactJobTitle
            }
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
              <StepDots current={3} total={3} />
            </Flex.Item>
          )}
          <Flex.Item style={{ width: isMobile ? "50%" : "120px" }}>
            <Button
              width="100%"
              intent="success"
              appearance="primary"
              loading={formik.isSubmitting}
              onClick={formik.submitForm}
            >
              Complete
            </Button>
          </Flex.Item>
        </Flex>
      </Modal.Footer>
    </>
  );
};

ProjectReference.validationSchema = validationSchema;

export default ProjectReference;
