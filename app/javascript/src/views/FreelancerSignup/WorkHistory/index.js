import React from "react";
import { Formik, Form } from "formik";
import { Button, Text, Box } from "@advisable/donut";
import { useMutation } from "@apollo/client";
import FileUpload from "../../../components/FileUpload";
import FormField from "components/FormField";
import UPDATE_PROFILE from "../updateProfile";
import COMPLETE_SETUP from "../completeSetup";
import validationSchema from "./validationSchema";
import { ArrowRight, UploadCloud } from "@styled-icons/feather";

const WorkHistory = ({ specialist, history }) => {
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [completeSetup] = useMutation(COMPLETE_SETUP);

  const handleSubmit = async (values) => {
    await updateProfile({
      variables: {
        input: values,
      },
    });

    await completeSetup({ variables: { input: {} } });
    history.push("/");
  };

  const initialValues = {
    website: specialist.website || "",
    linkedin: specialist.linkedin || "",
    resume: null,
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <Text as="h2" size="xxxl" weight="semibold" color="neutral900" mb="s">
            Work history
          </Text>
          <Text size="s" color="neutral700" lineHeight="m">
            This information will be shared with clients when you apply to
            projects. You can update your profile in your user settings.
          </Text>
          <Box bg="neutral100" width="100%" height="1px" my="l" />
          <Box mb="m">
            <FormField
              name="linkedin"
              label="Linkedin URL (Recommended)"
              placeholder="https://linkedin.com/..."
            />
          </Box>
          <Box mb="m">
            <FormField
              name="website"
              label="Website/Porfolio"
              placeholder="https://"
            />
          </Box>
          <Text size="s" color="neutral800" mb="xs" weight="medium">
            Resume
          </Text>
          <Box mb="l">
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
            />
            {formik.errors.resume && (
              <Text size="xs" color="red500" mt="xs">
                {formik.errors.resume}
              </Text>
            )}
          </Box>
          <Button
            size="l"
            type="submit"
            suffix={<ArrowRight />}
            loading={formik.isSubmitting}
          >
            Complete Setup
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default WorkHistory;
