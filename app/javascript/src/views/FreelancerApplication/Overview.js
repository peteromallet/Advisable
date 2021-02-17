import React from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { Box, Text } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import StepNumber from "./components/StepNumber";
import FileUpload from "src/components/FileUpload";
import { Description, Header } from "./components";
import { object, string } from "yup";
import { ArrowRight, UploadCloud } from "@styled-icons/feather";
import AnimatedCard from "./components/AnimatedCard";

const validationSchema = object().shape({
  linkedin: string().url("Please provide a valid LinkedIn URL"),
  website: string().url("Please provide a valid website URL"),
});

export default function Ovewview() {
  const history = useHistory();

  const initialValues = { linkedin: "", website: "", resume: null };

  const handleSubmit = () => {
    history.push("/freelancers/apply/experience");
  };

  return (
    <AnimatedCard>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <StepNumber>Step 2 of 5</StepNumber>
            <Header>Overview</Header>
            <Description>
              Every freelancer has that one project that stands out in there
              mind. The one that you were so excited to complete and add to your
              portfolio. Tell us about one of your previous projects that you
              are most proud of and why.
            </Description>
            <Box mb="l">
              <FormField
                name="linkedin"
                label="LinkedIn Profile"
                placeholder="https://linkedin.com/in/your-name"
              />
            </Box>
            <Box mb="l">
              <FormField
                name="website"
                label="Personal Website"
                placeholder="https://"
              />
            </Box>
            <Box mb="l">
              <Text fontWeight="medium" color="neutral800" mb={2}>
                Upload Resume
              </Text>
              <FileUpload
                label="Upload your resume"
                preview={() => {
                  return (
                    <Box display="inline-block" ml="xs" color="neutral600">
                      <UploadCloud />
                    </Box>
                  );
                }}
                onChange={(blob) => {
                  formik.setFieldValue("resume", blob.signed_id);
                }}
                accept=".pdf"
                maxSizeInMB={5}
              />
              {formik.errors.resume && (
                <Text size="xs" color="red500" mt="xs">
                  {formik.errors.resume}
                </Text>
              )}
            </Box>
            <SubmitButton suffix={<ArrowRight />}>Continue</SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}
