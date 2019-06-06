import React from "react";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import FieldRow from "src/components/FieldRow";
import StepDots from "src/components/StepDots";
import Checkbox from "src/components/Checkbox";
import TextField from "src/components/TextField";
import { useMobile } from "src/components/Breakpoint";
import { Text, Autocomplete } from "@advisable/donut";
import SuggestedSelect from "src/components/SuggestedSelect";
import validationSchema from "./validationSchema";

const ClientDetails = ({ formik, industries, skills }) => {
  let isMobile = useMobile();

  return (
    <React.Fragment>
      <Modal.Header>
        <Text size="l" weight="semibold">
          Client Details
        </Text>
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
            <Autocomplete
              name="industry"
              placeholder="e.g Financial Services"
              label="What industry/category is this company in?"
              error={formik.touched.industry && formik.errors.industry}
              options={industries}
              onBlur={formik.handleBlur}
              value={formik.values.industry}
              onChange={selection => {
                formik.setFieldTouched("industry", true);
                formik.setFieldValue("industry", selection.value);
              }}
            />
          </FieldRow>
          <FieldRow>
            <SuggestedSelect
              max={5}
              name="skills"
              isMulti={true}
              placeholder="e.g Facebook Marketing"
              label="What skills did you use for this project?"
              error={formik.touched.skills && formik.errors.skills}
              options={skills}
              onBlur={formik.handleBlur}
              value={formik.values.skills}
              onChange={skill => {
                formik.setFieldTouched("skills", true);
                formik.setFieldValue("skills", skill);
              }}
            />
          </FieldRow>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Flex align="center">
          {!isMobile && <Flex.Item style={{ width: "120px" }} />}
          {!isMobile && (
            <Flex.Item distribute="fill">
              <StepDots current={1} total={3} />
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
