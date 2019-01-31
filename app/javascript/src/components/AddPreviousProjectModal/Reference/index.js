import React from "react";
import Flex from "src/components/Flex";
import Modal from "src/components/Modal";
import Button from "src/components/Button";
import Select from "src/components/Select";
import Heading from "src/components/Heading";
import ChoiceList from "src/components/ChoiceList";
import FieldRow from "src/components/FieldRow";
import StepDots from "src/components/StepDots";
import TextField from "src/components/TextField";
import validationSchema from "./validationSchema";

const ProjectReference = ({ formik, gotoPreviousStep }) => {
  return (
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
              error={formik.touched.contactName && formik.errors.contactName}
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
                formik.touched.contactJobTitle && formik.errors.contactJobTitle
              }
            />
          </FieldRow>
          <FieldRow>
            <ChoiceList
              name="canContact"
              value={formik.values.canContact}
              label="Are you okay with us contacting them to validate this project?"
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" }
              ]}
              onChange={e => {
                formik.setFieldValue("canContact", e.target.value === "true");
              }}
            />
          </FieldRow>
          {formik.values.canContact && (
            <FieldRow>
              <React.Fragment>
                <TextField
                  name="contactEmail"
                  placeholder="e.g jane@company.com"
                  label="What’s their email address?"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contactEmail}
                  error={
                    formik.touched.contactEmail && formik.errors.contactEmail
                  }
                  description="If possible, please share their corporate email address. If not, if possible, please share the email address associated with their LinkedIn account."
                />
              </React.Fragment>
            </FieldRow>
          )}

          {formik.values.canContact === false && (
            <React.Fragment>
              <FieldRow>
                <Select
                  name="validationMethod"
                  onChange={formik.handleChange}
                  value={formik.values.validationMethod}
                  label="How can we validate that this project happened?"
                  description={
                    formik.values.validationMethod === "Not Possible" &&
                    "If you can't validate a project, we can use the data to figure out which projects to invite you to but we can't display it on your profile or use it as validation"
                  }
                  options={[
                    { value: "Linkedin", label: "Linkedin Reference" },
                    {
                      value: "External Site",
                      label: "External Site Reference"
                    },
                    { value: "Portfolio", label: "Link to Portfolio" },
                    {
                      value: "Not Possible",
                      label: "Validation not possible"
                    }
                  ]}
                />
              </FieldRow>
              {formik.values.validationMethod !== "Not Possible" && (
                <FieldRow>
                  <TextField
                    name="valiationUrl"
                    label="Please share the relevant URL for us to review"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.validationUrl}
                    placeholder="https://"
                  />
                </FieldRow>
              )}
            </React.Fragment>
          )}
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
            <Button block loading={formik.isSubmitting} onClick={formik.submitForm} size="l" styling="green">
              Complete
            </Button>
          </Flex.Item>
        </Flex>
      </Modal.Footer>
    </React.Fragment>
  );
};

ProjectReference.validationSchema = validationSchema

export default ProjectReference;
