import React from "react";
import { Text, Padding } from "@advisable/donut";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import Notice from "src/components/Notice";
import Select from "src/components/Select";
import FieldGroup from "src/components/FieldGroup";
import StepDots from "src/components/StepDots";
import URLFields from "./URLFields";
import ClientFields from "./ClientFields";
import { useMobile } from "src/components/Breakpoint";
import validationSchema from "./validationSchema";

const validationOptions = [
  { value: "Client", label: "I want you to contact the client" },
  {
    value: "URL",
    label: "I can share a link that proves that this project happened",
  },
  {
    value: "None",
    label: "I can't prove that this project happened",
  },
];

const ProjectReference = ({ formik, gotoPreviousStep }) => {
  let isMobile = useMobile();

  return (
    <React.Fragment>
      <Modal.Header>
        <Text size="l" weight="semibold">
          Project Validation
        </Text>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Padding bottom="s">
            <FieldGroup>
              <Select
                name="validationMethod"
                onBlur={formik.handleBlur}
                options={validationOptions}
                onChange={formik.handleChange}
                value={formik.values.validationMethod}
                label="How do you want to validate this project?"
              />
            </FieldGroup>
          </Padding>
          {formik.values.validationMethod === "Client" && (
            <ClientFields formik={formik} />
          )}
          {formik.values.validationMethod === "URL" && (
            <URLFields formik={formik} />
          )}
          {formik.values.validationMethod === "None" && (
            <Notice icon="info">
              If you can't validate a project, we can use the data to figure out
              which projects to invite you to but we can't display it on your
              profile or use it as validation
            </Notice>
          )}
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
              <StepDots current={3} total={3} />
            </Flex.Item>
          )}
          <Flex.Item style={{ width: isMobile ? "50%" : "120px" }}>
            <Button
              block
              loading={formik.isSubmitting}
              marginLeft="m"
              onClick={formik.submitForm}
              size="l"
              styling="green"
            >
              Complete
            </Button>
          </Flex.Item>
        </Flex>
      </Modal.Footer>
    </React.Fragment>
  );
};

ProjectReference.validationSchema = validationSchema;

export default ProjectReference;
