import React from "react";
import { Formik, Form } from "formik";
import { Button, Text, Box } from "@advisable/donut";
import { useMutation } from "react-apollo";
import TextField from "../../../components/TextField";
import FileUpload from "../../../components/FileUpload";
import UPDATE_PROFILE from "../updateProfile";

const WorkHistory = ({ specialist, history }) => {
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const handleSubmit = async values => {
    const { data, errors } = await updateProfile({
      variables: {
        input: values,
      },
    });

    history.push("/");
  };

  const initialValues = {
    website: specialist.website || "",
    linkedin: specialist.linkedin || "",
    resume: null,
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {formik => (
        <Form>
          <Text as="h2" size="xxxl" weight="semibold" color="blue.9" mb="s">
            Work history
          </Text>
          <Text size="s" color="neutral.5" lineheight="m">
            build your profile. this information will be shared with clients
            when you apply to projects. you can update your profile in your user
            settings.
          </Text>
          <Box bg="neutral.0" width="100%" height="1px" my="l" />
          <Box mb="m">
            <TextField
              name="linkedin"
              onBlur={formik.handleBlur}
              value={formik.values.linkedin}
              onChange={formik.handleChange}
              label="Linkedin URL (Recommended)"
              placeholder="https://linkedin.com/..."
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
            />
          </Box>
          <Box mb="m">
            <FileUpload
              label="Upload your resume"
              onChange={blob => {
                formik.setFieldValue("resume", blob.signed_id);
              }}
            />
          </Box>
          <Button
            size="l"
            intent="success"
            appearance="primary"
            type="submit"
            iconRight="arrow-right"
            loading={formik.isSubmitting}
          >
            continue
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default WorkHistory;
