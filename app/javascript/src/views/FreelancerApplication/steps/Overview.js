import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { ArrowRight, UploadCloud } from "@styled-icons/feather";
import { Box, Text } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import FileUpload from "src/components/FileUpload";
import AnimatedCard from "../components/AnimatedCard";
import { Description, Header } from "../components";
import StepNumber from "../components/StepNumber";
import { useMutation } from "@apollo/client";
import { UPDATE_OVERVIEW } from "../queries";

const validationSchema = object().shape({
  linkedin: string().url("Please provide a valid LinkedIn URL"),
  website: string().url("Please provide a valid website URL"),
  resume: string(),
});

export default function Overview({ specialist }) {
  const history = useHistory();
  const [update] = useMutation(UPDATE_OVERVIEW);

  const initialValues = {
    linkedin: specialist.linkedin || "",
    website: specialist.website || "",
    resume: "",
  };

  const handleSubmit = async ({ resume, ...values }) => {
    if (resume) {
      values.resume = resume;
      await update({ variables: { input: values } });
    } else {
      update({
        variables: { input: values },
        optimisticResponse: {
          __typename: "Mutation",
          updateProfile: {
            __typename: "UpdateProfilePayload",
            specialist: {
              __typename: "Specialist",
              id: specialist.id,
              ...values,
              resume: specialist.resume,
            },
          },
        },
      });
    }

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
