import React from "react";
import { Formik } from "formik";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import FieldRow from "src/components/FieldRow";
import StepDots from "src/components/StepDots";
import Checkbox from "src/components/Checkbox";
import TextField from "src/components/TextField";
import validationSchema from "./validationSchema";

const ClientDetails = ({ setValues, values, gotoNextStep }) => {
  const onSubmit = values => {
    setValues(values);
    gotoNextStep();
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={values}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        errors
      }) => (
        <form onSubmit={handleSubmit}>
          <Modal.Header>
            <Heading size="s">Client Details</Heading>
          </Modal.Header>
          <Modal.Body>
            <FieldRow>
              <TextField
                autoFocus
                name="clientName"
                placeholder="e.g Apple Inc."
                label="What was the client’s name?"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clientName}
                error={touched.clientName && errors.clientName}
              />
            </FieldRow>
            <FieldRow>
              <Checkbox
                name="confidential"
                label="This client is confidential"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confidential}
                description="If checked the client’s name will be hidden and the industry will be named instead. e.g Financial Services Company"
              />
            </FieldRow>
            <FieldRow>
              <TextField
                name="industry"
                placeholder="e.g Financial Services"
                label="What industry/category is this company in?"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.industry}
                error={touched.industry && errors.industry}
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
                onChange={handleChange}
                value={values.clientDescription}
                description="This should start with &quot;The client/company is...&quot;."
                error={touched.clientDescription && errors.clientDescription}
              />
            </FieldRow>
          </Modal.Body>
          <Modal.Footer>
            <Flex align="center">
              <Flex.Item style={{ width: "120px" }} />
              <Flex.Item distribute="fill">
                <StepDots current={1} total={4} />
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
  );
};

export default ClientDetails;
