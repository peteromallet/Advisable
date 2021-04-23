import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { UploadCloud } from "@styled-icons/feather/UploadCloud";
import { Box, Text, Error } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import FileUpload from "src/components/FileUpload";
import AnimatedCard from "../components/AnimatedCard";
import Header from "../components/Header";
import Description from "../components/Description";
import StepNumber from "../components/StepNumber";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../queries";
import { track } from "src/utilities/mixpanel";

export const validationSchema = object().shape({
  linkedin: string().nullable().url("Please provide a valid URL"),
  website: string().nullable().url("Please provide a valid URL"),
  resume: string()
    .nullable()
    .when(["linkedin", "website"], {
      is: (linkedin, website) => !linkedin && !website,
      then: string()
        .nullable()
        .required(
          "Please provide at least one of the above so that we can see your work history.",
        ),
    }),
});

export default function Overview({ specialist }) {
  const history = useHistory();
  const [update] = useMutation(UPDATE_PROFILE);

  const initialValues = {
    linkedin: specialist.linkedin || "",
    website: specialist.website || "",
    resume: null,
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await update({ variables: { input: values } });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    track("Overview (Specialist Application)");
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
              Add your portfolio links and resume to show us how you do what you
              do.
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
            <Box mb={4}>
              <Text fontWeight="medium" color="neutral800" mb={2}>
                Upload Resume
              </Text>
              <FileUpload
                label="Upload your resume"
                name="upload-resume"
                filename={specialist.resume?.filename}
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
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
              variant="gradient"
              size="l"
            >
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}
