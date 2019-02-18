import React from "react";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import FieldRow from "src/components/FieldRow";
import StepDots from "src/components/StepDots";
import Checkbox from "src/components/Checkbox";
import TextField from "src/components/TextField";
import { useMobile } from "src/components/Breakpoint";
import SuggestedSelect from "src/components/SuggestedSelect";
import validationSchema from "./validationSchema";

const ClientDetails = ({ formik, industries }) => {
  let isMobile = useMobile();

  return (
    <React.Fragment>
      <Modal.Header>
        <Heading size="s">Client Details</Heading>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FieldRow>
            <TextField
              autoFocus
              name="clientName"
              placeholder="e.g Apple Inc."
              label="What was the client's name?"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.clientName}
              error={formik.touched.clientName && formik.errors.clientName}
            />
          </FieldRow>
          <FieldRow>
            <Checkbox
              name="confidential"
              label="This client is confidential"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confidential}
              description="If checked the client’s name will be hidden and the industry will be named instead. e.g Financial Services Company"
            />
          </FieldRow>
          <FieldRow>
            <SuggestedSelect
              name="industry"
              placeholder="e.g Financial Services"
              label="What industry/category is this company in?"
              error={formik.touched.industry && formik.errors.industry}
              options={industries}
              onBlur={formik.handleBlur}
              value={formik.values.industry}
              onChange={industry => {
                formik.setFieldTouched('industry', true)
                formik.setFieldValue("industry", industry);
              }}
            />
          </FieldRow>
          <FieldRow>
            <TextField
              multiline
              minRows={6}
              maxLength={300}
              name="clientDescription"
              placeholder="The client is..."
              label="Give a short overview of this company"
              onChange={formik.handleChange}
              value={formik.values.clientDescription}
              description="This should start with &quot;The client/company is...&quot;."
              error={
                formik.touched.clientDescription &&
                formik.errors.clientDescription
              }
            />
          </FieldRow>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Flex align="center">
          {!isMobile && <Flex.Item style={{ width: "120px" }} />}
          {!isMobile && (
            <Flex.Item distribute="fill">
              <StepDots current={1} total={4} />
            </Flex.Item>
          )}
          <Flex.Item style={{ width: isMobile ? "100%" : "120px" }}>
            <Button block onClick={formik.submitForm} size="l" styling="green">
              Next
            </Button>
          </Flex.Item>
        </Flex>
      </Modal.Footer>
    </React.Fragment>
  );
};

ClientDetails.validationSchema = validationSchema;

export default ClientDetails;
