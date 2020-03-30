import React from "react";
import { Formik, Form } from "formik";
import { Button, Text, Box, Icon } from "@advisable/donut";
import { useMutation } from "@apollo/react-hooks";
import TextField from "../../../components/TextField";
import FileUpload from "../../../components/FileUpload";
import UPDATE_PROFILE from "../updateProfile";
import COMPLETE_SETUP from "../completeSetup";
import validationSchema from "./validationSchema";

const WorkHistory = ({ specialist, history }) => {
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [completeSetup] = useMutation(COMPLETE_SETUP);

  const handleSubmit = async (values) => {
    const { data, errors } = await updateProfile({
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
          <Text as="h2" size="xxxl" weight="semibold" color="neutral.9" mb="s">
            Work history
          </Text>
          <Text size="s" color="neutral.7" lineHeight="m">
            This information will be shared with clients when you apply to
            projects. You can update your profile in your user settings.
          </Text>
          <Box bg="neutral.1" width="100%" height="1px" my="l" />
          <Box mb="m">
            <TextField
              name="linkedin"
              onBlur={formik.handleBlur}
              value={formik.values.linkedin}
              onChange={formik.handleChange}
              label="Linkedin URL (Recommended)"
              placeholder="https://linkedin.com/..."
              error={formik.touched.linkedin && formik.errors.linkedin}
            />
          </Box>
          <Box mb="m">
            <TextField
              name="website"
              onBlur={formik.handleBlur}
              value={formik.values.website}
              onChange={formik.handleChange}
              label="Website/Porfolio"
              placeholder="https://"
              error={formik.touched.website && formik.errors.website}
            />
          </Box>
          <Text size="s" color="neutral.8" mb="xs" weight="medium">
            Resume
          </Text>
          <Box mb="l">
            <FileUpload
              label="Upload your resume"
              preview={() => {
                return <Icon icon="upload-cloud" ml="xs" color="neutral.6" />;
              }}
              onChange={(blob) => {
                formik.setFieldValue("resume", blob.signed_id);
              }}
            />
            {formik.errors.resume && (
              <Text size="xs" color="red.5" mt="xs">
                {formik.errors.resume}
              </Text>
            )}
          </Box>
          <Button
            size="l"
            intent="success"
            appearance="primary"
            type="submit"
            iconRight="arrow-right"
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
