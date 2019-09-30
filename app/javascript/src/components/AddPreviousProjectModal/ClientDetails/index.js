import React from "react";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import Select from "src/components/Select";
import StepDots from "src/components/StepDots";
import Checkbox from "src/components/Checkbox";
import TextField from "src/components/TextField";
import { useMobile } from "src/components/Breakpoint";
import { Text, Autocomplete, Button, Box } from "@advisable/donut";
import validationSchema from "./validationSchema";

const ClientDetails = ({ formik, industries, skills }) => {
  const isMobile = useMobile();
  const industry = formik.values.industry;

  return (
    <React.Fragment>
      <Modal.Header>
        <Text size="l" weight="medium">
          Client Details
        </Text>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Box mb="m">
            <TextField
              autoFocus
              name="clientName"
              placeholder="e.g Apple Inc."
              label="What was the client's name?"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.clientName}
              error={formik.submitCount > 0 && formik.errors.clientName}
            />
          </Box>
          <Box mb="m">
            <Select
              name="companyType"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.companyType}
              label="What type of company is this?"
              error={formik.submitCount > 0 && formik.errors.companyType}
              options={[
                "Individual Entrepreneur",
                "Small Business",
                "Medium-Sized Business",
                "Startup",
                "Growth-Stage Startup",
                "Major Corporation",
                "Non-Profit",
                "Education Institution",
                "Government",
              ]}
            />
          </Box>
          <Box mb="m">
            <Autocomplete
              name="industry"
              placeholder="e.g Financial Services"
              label="What industry/category is this company in?"
              error={formik.submitCount > 0 && formik.errors.industry}
              options={industries}
              onBlur={formik.handleBlur}
              value={formik.values.industry}
              onChange={selection => {
                formik.setFieldTouched("industry", true);
                formik.setFieldValue("industry", selection.value);
              }}
            />
          </Box>
          <Box mb="m">
            <Autocomplete
              max={5}
              multiple
              name="skills"
              placeholder="Search for a skill..."
              label="What skills did you use for this project?"
              error={formik.submitCount > 0 && formik.errors.skills}
              options={skills}
              value={formik.values.skills}
              onChange={skills => {
                formik.setFieldTouched("skills", true);
                formik.setFieldValue("skills", skills);
              }}
            />
          </Box>
          <Checkbox
            name="confidential"
            label="This client is confidential"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.confidential}
            description={`If checked the client’s name will be hidden and the industry will be named instead. e.g '${industry ||
              "Financial Services"} Company'`}
          />
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
            <Button
              width="100%"
              onClick={formik.submitForm}
              appearance="primary"
              intent="success"
              iconRight="arrow-right"
            >
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
